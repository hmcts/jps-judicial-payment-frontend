import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from './sitting-records-form-validator';

describe('CustomValidators', () => {

    describe('validateDateFormat', () => {
        let control: FormGroup;

        beforeEach(() => {
            control = new FormGroup({
                dateDay: new FormControl(''),
                dateMonth: new FormControl(''),
                dateYear: new FormControl('')
            });
        });

        it('should return date_invalid error when day, month or year is invalid', () => {
            control.patchValue({ dateDay: '', dateMonth: '02', dateYear: '2023' });
            control.get('dateDay')?.markAsTouched();
            expect(CustomValidators.validateDateFormat(control)).toEqual({ 'date_invalid': true });

            control.patchValue({ dateDay: '01', dateMonth: '', dateYear: '2023' });
            control.get('dateMonth')?.markAsTouched();
            expect(CustomValidators.validateDateFormat(control)).toEqual({ 'date_invalid': true });

            control.patchValue({ dateDay: '01', dateMonth: '02', dateYear: '23' });
            control.get('dateYear')?.markAsTouched();
            expect(CustomValidators.validateDateFormat(control)).toEqual({ 'date_invalid': true });
        });

        it('should return date_after_today error when date is after today', () => {
            const today = new Date()
            control.patchValue({ dateDay: (today.getDate()+1).toString(), dateMonth: (today.getMonth()+1).toString(), dateYear: today.getFullYear().toString()})
            expect(CustomValidators.validateDateFormat(control)).toEqual({ 'date_after_today': true })
        })

        it('should return date_after_today error when date is after today', () => {
            control.patchValue({ dateDay: '01', dateMonth: '02', dateYear: '2020'})
            expect(CustomValidators.validateDateFormat(control)).toEqual({ 'date_out_of_support': true })
        })

        it('should return null when date is valid', () => {
            const today = new Date()
            control.patchValue({ dateDay: today.getDate().toString(), dateMonth: (today.getMonth()+1).toString(), dateYear: today.getFullYear().toString()})
            expect(CustomValidators.validateDateFormat(control)).toEqual(null)
        })

    });

    describe('validateDay', () => {
        let control: AbstractControl;

        beforeEach(() => {
            control = new FormControl('');
        });

        it('should return out_of_date_range error when day is greater than 31', () => {
            control.setValue('32');
            control.markAsDirty();
            expect(CustomValidators.validateDay(control)).toEqual({ 'out_of_date_range': true });
        });

        it('should return contains_non_int error when day contains non-integer characters', () => {
            control.setValue('1a');
            control.markAsDirty();
            expect(CustomValidators.validateDay(control)).toEqual({ 'contains_non_int': true });
        });

    });

    describe('validateMonth', () => {
        let control: AbstractControl;

        beforeEach(() => {
            control = new FormControl('');
        });

        it('should return out_of_month_range error when month is greater than 12', () => {
            control.setValue('13');
            control.markAsDirty();
            expect(CustomValidators.validateMonth(control)).toEqual({ 'out_of_month_range': true });
        });

        it('should return contains_non_int error when month contains non-integer characters', () => {
            control.setValue('1a');
            control.markAsDirty();
            expect(CustomValidators.validateMonth(control)).toEqual({ 'contains_non_int': true });
        });

    });

    describe('validateYear', () => {
        let control: AbstractControl;

        beforeEach(() => {
            control = new FormControl('');
        });

        it('should return year_after_current error when year is greater than current year', () => {
            const currentYear = new Date().getFullYear();
            control.setValue((currentYear + 1).toString());
            control.markAsDirty();
            expect(CustomValidators.validateYear(control)).toEqual({ 'year_after_current': true });
        });

        it('should return contains_non_int error when year contains non-integer characters', () => {
            control.setValue('202a');
            control.markAsDirty();
            expect(CustomValidators.validateYear(control)).toEqual({ 'contains_non_int': true });
        });

    })
})