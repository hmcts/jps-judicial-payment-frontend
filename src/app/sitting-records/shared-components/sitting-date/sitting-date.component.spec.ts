import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingDateComponent } from './sitting-date.component';

describe('SittingDateComponent', () => {
  let component: SittingDateComponent;
  let fixture: ComponentFixture<SittingDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SittingDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
