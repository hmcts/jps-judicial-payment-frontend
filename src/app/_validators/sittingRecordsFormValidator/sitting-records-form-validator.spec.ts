import { FormControl, FormGroup } from '@angular/forms';
import { ManageSittingRecord } from './sitting-records-form-validator';

describe('ManageSittingRecord', () => {

    describe('validateDateFormat', () => {
        let control: FormGroup;

        beforeEach(() => {
            control = new FormGroup({
                dateDay: new FormControl(''),
                dateMonth: new FormControl(''),
                dateYear: new FormControl('')
            });
            control.get('dateDay')?.markAsDirty();
            control.get('dateMonth')?.markAsDirty();
            control.get('dateYear')?.markAsDirty();
        });

        it('should return date_invalid error when day, month or year is invalid', () => {
            control.patchValue({ dateDay: '1', dateMonth: '13', dateYear: '2023' });
            control.get('dateDay')?.markAsTouched();
            control.get('dateMonth')?.markAsTouched();
            control.get('dateYear')?.markAsTouched();
            expect(ManageSittingRecord.validateDateFormat(control)).toEqual({ 'date_invalid': true });

            control.patchValue({ dateDay: '33', dateMonth: '1', dateYear: '2023' });
            control.get('dateDay')?.markAsTouched();
            control.get('dateMonth')?.markAsTouched();
            control.get('dateYear')?.markAsTouched();
            expect(ManageSittingRecord.validateDateFormat(control)).toEqual({ 'date_invalid': true });

            control.patchValue({ dateDay: '01', dateMonth: '02', dateYear: '23' });
            control.get('dateDay')?.markAsTouched();
            control.get('dateMonth')?.markAsTouched();
            control.get('dateYear')?.markAsTouched();
            expect(ManageSittingRecord.validateDateFormat(control)).toEqual({ 'date_invalid': true });

        });

        it('should return date_out_of_support error when date is after today', () => {
            control.patchValue({ dateDay: '01', dateMonth: '02', dateYear: '2020'})
            expect(ManageSittingRecord.validateDateFormat(control)).toEqual({ 'date_out_of_support': true })
        })

        it('should return null when date is valid', () => {
            const today = new Date()
            control.patchValue({ dateDay: today.getDate().toString(), dateMonth: (today.getMonth()+1).toString(), dateYear: today.getFullYear().toString()})
            expect(ManageSittingRecord.validateDateFormat(control)).toEqual(null)
        })

    });

})