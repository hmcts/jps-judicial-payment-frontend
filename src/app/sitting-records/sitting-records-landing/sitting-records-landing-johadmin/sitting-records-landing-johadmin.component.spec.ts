import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingRecordsLandingJohadminComponent } from './sitting-records-landing-johadmin.component';
import { TribunalServiceComponent } from '../../shared-components/tribunal-service/tribunal-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSearchComponent } from '../../shared-components/user-search/user-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('SittingRecordsLandingJohadminComponent', () => {
  let component: SittingRecordsLandingJohadminComponent;
  let fixture: ComponentFixture<SittingRecordsLandingJohadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittingRecordsLandingJohadminComponent, TribunalServiceComponent, UserSearchComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatAutocompleteModule],

    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingRecordsLandingJohadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable johName control when tribunalService value changes', () => {
    const tribunalServiceControl = component.johAdminForm.controls['tribunalService'];
    const johNameControl = component.johAdminForm.controls['johName'];
    tribunalServiceControl.setValue('some value');  
    expect(johNameControl.enabled).toBe(true);
  });
  
  it('should emit johAdminFormValid event with correct values when form status changes to VALID', () => {
    const emitSpy = spyOn(component.johAdminFormValid, 'emit');
    component.johAdminForm.get('tribunalService')?.setValue({hmctsServiceCode: '1234'});
    component.johAdminForm.get('johName')?.setValue({fullName: 'John'});
    expect(emitSpy).toHaveBeenCalledWith([true, 'johAdmin']);
  });

});
