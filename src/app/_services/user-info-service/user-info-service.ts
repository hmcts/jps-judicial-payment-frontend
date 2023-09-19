import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    idamID!: string;
    userName!: string;
    userRoles!: string;

    setUserInfo(userInfo, userRole){
        userInfo = JSON.parse(userInfo.slice(2, userInfo.length))
        this.idamID = userInfo[0]
        this.userName = userInfo[1]
        this.userRoles = JSON.parse(userRole.slice(2, userRole.length))
    }

    getIdamId(){
        return this.idamID
    }

    getUserName(){
        return this.userName
    }

}
