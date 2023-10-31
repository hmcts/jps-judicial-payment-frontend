import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchComponent } from './user-search.component';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { UserModel } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user-service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSearchComponent, MatAutocomplete],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [UserService, FormGroupDirective]
    }).compileComponents();    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    component.parentFormGroup.form = new FormBuilder().group({
      tribunalService: [{hmctsServiceCode: '1234'}],
      johName: ['']
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the controls of the parent form group', () => {
    const controls = component.johName;
    expect(controls).toEqual(component.parentFormGroup.control.controls);
  });

  it('should set johName control value when optionSelected is called', () => {
    const user: UserModel = {
      title: 'Mr',
      knownAs: 'John',
      surname: 'Doe',
      fullName: 'John Doe',
      emailId: 'john.doe@example.com',
      idamId: 'JD123',
      personalCode: '1234567890'
    };
    const event: MatAutocompleteSelectedEvent = {
      option: { value: user }
    } as MatAutocompleteSelectedEvent;

    component.optionSelected(event);

    expect(component.parentFormGroup.control.get('johName')?.value).toEqual(user);
  });

  it('should return fullName when showUserName is called with a user', () => {
    const user: UserModel = {
      title: 'Mr',
      knownAs: 'John',
      surname: 'Doe',
      fullName: 'John Doe',
      emailId: 'john.doe@example.com',
      idamId: 'JD123',
      personalCode: '1234567890'
    };

    const result = component.showUserName(user);

    expect(result).toEqual('John Doe');
  });

  it('should set JOH name, clear user list, and fetch user roles on optionSelected', () => {
    const mockUser = { personalCode: '12345' };
  
    const event: MatAutocompleteSelectedEvent = {
      option: {
        value: mockUser
      }
    } as MatAutocompleteSelectedEvent;
    
  
    component.optionSelected(event);
  
    expect(component.parentFormGroup.control.get('johName')?.value).toEqual(mockUser);
    expect(component.userList).toEqual([]);
  });

  it('should get users from the user service', () => {
    const mockUsers: UserModel[] = [ 
      {
        title: '',
        knownAs: '',
        surname: '',
        fullName: '',
        emailId: '',
        idamId: '',
        personalCode: '' 
      }
    ]
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));

    const searchString = 'John';
    component.getUsers(searchString).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    expect(userService.getUsers).toHaveBeenCalledWith(searchString, '1234', '');
  });

});