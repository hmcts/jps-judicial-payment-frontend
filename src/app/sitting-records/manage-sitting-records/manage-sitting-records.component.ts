import { Component, OnInit} from '@angular/core';
import { 
  AbstractControl,
  FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedWorkflowService } from '../../_workflows/shared-workflow.service';
import { CustomValidators } from '../../_validators/sitting-records-form-validator';
import { LocationService } from '../../_services/location-service/location.service'
import { VenueModel } from '../../_models/venue.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { environment } from '../../environments/environment'
import { debounceTime, map, startWith, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-manage-sitting-records',
  templateUrl: './manage-sitting-records.component.html',
  styleUrls: ['./manage-sitting-records.component.scss']
})
export class ManageSittingRecordsComponent implements OnInit {
  manageRecords: FormGroup;
  venues: VenueModel[] = [];
  readonly minSearchCharacters = 3;
  delay = 300;
  typeaheadResultsFound = true;
  tribunalServices = environment.tribunalServices;
  filteredVenues;
  showPreviousButton = true;
  
  submitForm(){
    this.sharedWorkFlowService.setFormData(this.manageRecords)
    this.sharedWorkFlowService.setManageVisited()
    void this.router.navigate(['sittingRecords','view'])
  }

  get f(): { [key: string]: AbstractControl } {
    return this.manageRecords?.controls;
  }

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    private sharedWorkFlowService: SharedWorkflowService,
    private locationService : LocationService,
    private cookies: CookieService,
  ){
    this.manageRecords = this.formBuilder.group(
      {
        tribunalService: new FormControl('', Validators.required),
        venue: new FormControl('', [Validators.required, CustomValidators.requireVenueMatch]),
        dateSelected: this.formBuilder.group({
          dateDay: ['', [Validators.required,]],
          dateMonth: ['', [Validators.required,]],
          dateYear: ['', [Validators.required,]],
        },{
          validators: [
            CustomValidators.validateDateFormat
          ]
        })
      }
    );

    this.manageRecords.controls['venue'].disable();
    
    this.manageRecords.valueChanges.subscribe(() => {
      if(this.manageRecords.controls['tribunalService'].value !== "" && this.manageRecords.controls['venue'].disabled){
        this.manageRecords.controls['venue'].enable();
      }

    })

    this.manageRecords.controls['tribunalService'].valueChanges.subscribe(() => {
      console.log(this.manageRecords)
      if(this.manageRecords.controls['venue'].value !== ""){
        this.manageRecords.controls['venue'].reset();
      }else{
        this.getVenues(this.manageRecords.controls['tribunalService'].value['hmctsServiceCode']);
      }
    });

  }

  ngOnInit(): void {
    if(this.sharedWorkFlowService.getFormData()){
      this.manageRecords = this.sharedWorkFlowService.getFormData();
    }

    const userRole = this.cookies.get('__userrole__');

    if (userRole.indexOf('jps-recorder') != -1)
      this.showPreviousButton = false;
  }
  
  public getVenues(serviceCode: string) {
    this.locationService.getAllVenues(serviceCode).subscribe((locations) => {
      this.venues = locations['court_venues'];
    });
  }

  goBack(){
    void this.router.navigate(['sittingRecords','home'])
  }
  
}

