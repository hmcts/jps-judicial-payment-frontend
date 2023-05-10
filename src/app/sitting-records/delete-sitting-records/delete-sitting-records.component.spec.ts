import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSittingRecordsComponent } from './delete-sitting-records.component';

describe('DeleteSittingRecordsComponent', () => {
  let component: DeleteSittingRecordsComponent;
  let fixture: ComponentFixture<DeleteSittingRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSittingRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSittingRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
