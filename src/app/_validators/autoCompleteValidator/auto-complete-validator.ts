import { Validators, AbstractControl } from '@angular/forms';

// create your class that extends the angular validator class
export class AutoCompleteValidator extends Validators {

    static requireSelection(control: AbstractControl) {
        const inputValue: string | object = control.value;
        if (typeof inputValue === 'string') {
            return { 'value_not_selected': true };
        }
        return null;
    }

}