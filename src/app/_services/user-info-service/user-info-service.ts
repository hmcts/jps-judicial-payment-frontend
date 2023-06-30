import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    idamID!: string;
    userName!: string;

    setUserInfo(userInfo){
        userInfo = JSON.parse(userInfo.slice(2, userInfo.length))
        this.idamID = userInfo[0]
        this.userName = userInfo[1]
    }

    getIdamId(){
        return this.idamID
    }

    getUserName(){
        return this.userName
    }

}
