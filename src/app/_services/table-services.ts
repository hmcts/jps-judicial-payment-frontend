import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class tableService {

    getPeriod(am: string, pm: string) {
        const amBool = am === 'true' ? true : false
        const pmBool = pm === 'true' ? true : false
        if (amBool && pmBool) { return "Full Day" }
        if (amBool) { return "Morning" }
        if (pmBool) { return "Afternoon" }
        return ""
    }

}

