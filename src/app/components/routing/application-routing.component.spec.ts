import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationRoutingComponent } from './application-routing.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

describe('ApplicationRoutingComponent', () => {
  let component: ApplicationRoutingComponent;
  let fixture: ComponentFixture<ApplicationRoutingComponent>;
  let router: Router;
  let cookieService: CookieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationRoutingComponent],
      imports: [RouterTestingModule],
      providers: [CookieService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRoutingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to sittingRecords/manage if userRole contains "jps-recorder"', () => {
    spyOn(cookieService, 'get').and.returnValue('jps-recorder');
    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['sittingRecords', 'manage']);
  });

  it('should not navigate if userRole does not contain "jps-recorder"', () => {
    spyOn(cookieService, 'get').and.returnValue('other-role');
    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
