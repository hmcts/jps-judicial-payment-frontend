import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../app.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JPFooterComponent } from '../../jp-footer/jp-footer.component';
import { JPHeaderComponent } from '../../jp-header/jp-header.component';
import { CookieManagerComponent } from '../../cookies/cookie-manager/cookie-manager.component'

describe('ApplicationRoutingComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router; // Replace with the correct Router type if needed
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, JPFooterComponent, JPHeaderComponent, CookieManagerComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
