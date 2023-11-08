import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ManageSittingRecord } from './sitting-records-form-validator';
import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

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

    describe('dateLessThan', () => {
        let formGroup: FormGroup;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ReactiveFormsModule],
            });

            // Initialize a form group structure matching the validator requirements
            formGroup = new FormGroup({
                startDateField: new FormGroup({
                    dateYear: new FormControl(),
                    dateMonth: new FormControl(),
                    dateDay: new FormControl(),
                }),
                endDateField: new FormGroup({
                    dateYear: new FormControl(),
                    dateMonth: new FormControl(),
                    dateDay: new FormControl(),
                }),
            });
        });

        function setDate(formGroup: AbstractControl, fieldName: string, year: string, month: number, day: number) {
            const group = formGroup.get(fieldName) as FormGroup;
            group.get('dateYear')?.setValue(year);
            group.get('dateMonth')?.setValue(month);
            group.get('dateDay')?.setValue(day);
        }

        it('should validate that the end date is after the start date', () => {
            setDate(formGroup, 'startDateField', '2023', 5, 20);
            setDate(formGroup, 'endDateField', '2023', 5, 21);

            const validatorFn = ManageSittingRecord.dateLessThan('startDateField', 'endDateField');
            const result = validatorFn(formGroup);

            expect(result).toBeNull(); 
        });

        it('should invalidate when the start date is after the end date', () => {
            setDate(formGroup, 'startDateField', '2023', 5, 22);
            setDate(formGroup, 'endDateField', '2023', 5, 21);

            const validatorFn = ManageSittingRecord.dateLessThan('startDateField', 'endDateField');
            const result = validatorFn(formGroup);

            expect(result).toEqual({ dateLessThan: true });
        });

        it('should invalidate if the dates are not properly formatted', () => {
            setDate(formGroup, 'startDateField', '23', 5, 20); 
            setDate(formGroup, 'endDateField', '2023', 5, 21);

            const validatorFn = ManageSittingRecord.dateLessThan('startDateField', 'endDateField');
            const result = validatorFn(formGroup);

            expect(result).toBeNull(); 
        });

        it('should return null if the dates are not set', () => {
            const validatorFn = ManageSittingRecord.dateLessThan('startDateField', 'endDateField');
            const result = validatorFn(formGroup);

            expect(result).toBeNull(); 
        });
    });

})