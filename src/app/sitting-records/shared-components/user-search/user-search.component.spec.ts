import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchComponent } from './user-search.component';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userList when getUsers is called', () => {
    const users: UserModel[] = [
      {
        title: 'Mr',
        knownAs: 'John',
        surname: 'Doe',
        fullName: 'John Doe',
        emailId: 'john.doe@example.com',
        idamId: 'JD123',
        personalCode: '1234567890'
      },
      {
        title: 'Ms',
        knownAs: 'Jane',
        surname: 'Smith',
        fullName: 'Jane Smith',
        emailId: 'jane.smith@example.com',
        idamId: 'JS456',
        personalCode: '0987654321'
      }
    ];
    spyOn(userService, 'getUsers').and.returnValue(of(users));

    component.getUsers('search');

    expect(component.userList).toEqual(users);
  });

  it('should set usersFound to false when no users are found', () => {
    spyOn(userService, 'getUsers').and.returnValue(of([]));

    component.getUsers('search');

    expect(component.usersFound).toBeFalse();
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
});