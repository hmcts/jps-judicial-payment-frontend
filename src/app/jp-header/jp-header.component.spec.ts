import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JPHeaderComponent } from './jp-header.component';

describe('JPHeaderComponent', () => {
  let component: JPHeaderComponent;
  let fixture: ComponentFixture<JPHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JPHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JPHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
