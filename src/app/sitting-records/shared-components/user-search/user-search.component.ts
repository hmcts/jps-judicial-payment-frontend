import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, catchError, debounceTime, filter, mergeMap, tap } from 'rxjs';
import { UserModel } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/user-service/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit{
  usersFound = true;
  userList: UserModel[] = [];
  searchTerm = "";

  constructor(
    public parentFormGroup: FormGroupDirective,
    public userSvc: UserService
    ) { } 

    get johName(): { [key: string]: AbstractControl } {
      return this.parentFormGroup?.control.controls;
    }

    ngOnInit(){
      this.parentFormGroup.control.get('johName')?.valueChanges
      .pipe(
        tap(() => this.usersFound = true),
        tap(() => this.userList = [] as UserModel[]),
        tap(term => this.searchTerm = term),
        filter(value => value && value.length >= 3),
        debounceTime(500),
        mergeMap(value => this.getUsers(value).pipe(
          catchError(() => {
            this.usersFound = false;
            return [];
          })
        )),
      ).subscribe(users => {
        this.userList = users;
        if (users.length === 0) {
          this.usersFound = false
        }
      })
    }

    getUsers(searchString: string): Observable<UserModel[]> {
      const serviceCode = this.parentFormGroup.control.value['tribunalService'].hmctsServiceCode
      return this.userSvc.getUsers(searchString, serviceCode, '')
    }

    optionSelected(event: MatAutocompleteSelectedEvent) {
      const user = event.option.value as UserModel
      this.parentFormGroup.control.get('johName')?.setValue(user)
    }

    public showUserName(value: UserModel) {
      if (value) {
        return value.fullName;
      }
      return ""
    }
}
