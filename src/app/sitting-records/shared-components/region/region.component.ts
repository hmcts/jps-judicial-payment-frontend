import { Component, OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { LocationService } from 'src/app/_services/location-service/location.service';
import { RegionModel } from '../../../_models/region.model';
import { SubmitterWorkflowService } from '../../../_workflows/submitter-workflow.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  regions: RegionModel[] = [];

  constructor(
  private submitterWorkFlowService: SubmitterWorkflowService,
  private locationService: LocationService,
  public parentFormGroup: FormGroupDirective ) { }

  ngOnInit(): void {
    if(this.submitterWorkFlowService.getFormData()){
      this.regions = this.submitterWorkFlowService.getFinanceRegions();
    } else {
      // as we get all regions we only need to do this on the first load of the page
      this.getRegions();
    }
  }

  public getRegions(): void {
    this.locationService.getAllRegions().subscribe(regions => {
      this.regions = regions
      this.submitterWorkFlowService.setFinanceRegions(regions)
    });
  }

}
