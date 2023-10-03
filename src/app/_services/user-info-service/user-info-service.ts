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

    getUserRole(){
        return this.userRoles
    }

    isRecorder(){
        return this.userRoles.indexOf('jps-recorder')
    }
    
    isPublisher(){
        return this.userRoles.indexOf('jps-publisher')
    }

    isJohAdmin(){
        return this.userRoles.indexOf('jps-JOH-admin')
    }

}
