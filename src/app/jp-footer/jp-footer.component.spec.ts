import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JPFooterComponent } from './jp-footer.component';

describe('JPFooterComponent', () => {
  let component: JPFooterComponent;
  let fixture: ComponentFixture<JPFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JPFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JPFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
