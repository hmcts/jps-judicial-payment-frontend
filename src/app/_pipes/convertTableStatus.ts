import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalizeFirstLetterForStatus'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';  // if the string is null or undefined, return an empty string
        value = value.toLowerCase();  // make the entire string lower case
        return value.charAt(0).toUpperCase() + value.slice(1);  // capitalize the first letter and append the rest of the string
    }

}