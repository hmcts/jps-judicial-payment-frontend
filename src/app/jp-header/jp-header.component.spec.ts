import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JPHeaderComponent } from './jp-header.component';
import { LogoutComponent } from '../logout/logout.component';
import { HttpClientModule } from '@angular/common/http';

describe('JPHeaderComponent', () => {
  let component: JPHeaderComponent;
  let fixture: ComponentFixture<JPHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ JPHeaderComponent, LogoutComponent ]
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
