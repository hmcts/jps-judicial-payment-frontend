import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public logout() {
        return this.http.get('/auth/logout?noredirect=true');
    }

}
