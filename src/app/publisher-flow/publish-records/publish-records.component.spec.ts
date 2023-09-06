import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishRecordsComponent } from './publish-records.component';

describe('PublishRecordsComponent', () => {
  let component: PublishRecordsComponent;
  let fixture: ComponentFixture<PublishRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishRecordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
