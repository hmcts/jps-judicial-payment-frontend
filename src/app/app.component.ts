import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private cookies: CookieService
  ){}

  ngOnInit(){
    this.navigateBasedOnUserRole()
  }

  navigateBasedOnUserRole(){
    // TODO: move below role collection out of cookies and into a user service file.
    const userRole = this.cookies.get('__userrole__');
    if(userRole.indexOf('jps-recorder') != -1){
      void this.router.navigate(['sittingRecords', 'manage'])
    }
  }

}
