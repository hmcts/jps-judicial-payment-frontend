import { Component } from '@angular/core';
import { LogoutService } from '../_services/auth/logout.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(
    private logoutSvc: LogoutService,
    protected router: Router,
    ) { }

  logout() {
    this.logoutSvc.logout().subscribe(
      () => {
        void this.router.navigate(['/'])
      }
    );
  }

}
