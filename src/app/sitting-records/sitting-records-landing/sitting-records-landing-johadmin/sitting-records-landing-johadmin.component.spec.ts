import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingRecordsLandingJohadminComponent } from './sitting-records-landing-johadmin.component';
import { TribunalServiceComponent } from '../../shared-components/tribunal-service/tribunal-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from '../../shared-components/user-search/user-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('SittingRecordsLandingJohadminComponent', () => {
  let component: SittingRecordsLandingJohadminComponent;
  let fixture: ComponentFixture<SittingRecordsLandingJohadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittingRecordsLandingJohadminComponent, TribunalServiceComponent, UserSearchComponent, MatAutocomplete],
      imports: [ReactiveFormsModule, HttpClientTestingModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingJohadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
