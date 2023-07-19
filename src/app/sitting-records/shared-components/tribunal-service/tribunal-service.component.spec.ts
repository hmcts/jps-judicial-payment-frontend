import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunalServiceComponent } from './tribunal-service.component';

describe('TribunalServiceComponent', () => {
  let component: TribunalServiceComponent;
  let fixture: ComponentFixture<TribunalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TribunalServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TribunalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
