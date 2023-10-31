import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule} from '@angular/forms';
import { RegionModel } from '../../../_models/region.model';
import { RegionComponent } from './region.component';
import { LocationService } from '../../../_services/location-service/location.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('RegionComponent', () => {
  let component: RegionComponent;
  let fixture: ComponentFixture<RegionComponent>;
  let locationService: LocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule ],
      declarations: [ RegionComponent ],
      providers: [ FormGroupDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);
    component.parentFormGroup.form = new FormBuilder().group({
      region: ['Region 1'],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the LocationService and return regions when calling getRegions', () => {
    const regions: RegionModel[] = [
      { region_id: '1',
      description: 'Region1',
      welsh_region: '',
      },
      { region_id: '2',
      description: 'Region2',
      welsh_region: '',
      }
    ];

    spyOn(locationService, 'getAllRegions').and.returnValue(of(regions));

    component.getRegions();
    expect(locationService.getAllRegions).toHaveBeenCalled();

  });

});
