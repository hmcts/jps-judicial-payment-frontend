import { FormGroup, FormControl } from '@angular/forms';
import { JohDateValidator } from 'src/app/_validators/johDataValidator/joh-date-validator';

describe('JohDateValidator', () => {

    it('should return null if all fields are not dirty', () => {
        const form = new FormGroup({
            flagDay: new FormControl(''),
            flagMonth: new FormControl(''),
            flagYear: new FormControl('')
        });
        form.markAllAsTouched()
        form.markAsDirty()

        const result = JohDateValidator.validateJohDate(form);

        expect(result).toBeNull();
    });

    it('should return "date_invalid" error if day is invalid', () => {
        const form = new FormGroup({
            flagDay: new FormControl('32'),
            flagMonth: new FormControl('1'),
            flagYear: new FormControl('2023')
        });
        form.markAllAsTouched()
        form.controls['flagDay'].markAsDirty()
        form.controls['flagMonth'].markAsDirty()
        form.controls['flagYear'].markAsDirty()

        const result = JohDateValidator.validateJohDate(form);

        expect(result).toEqual({ 'date_invalid': true });
    });

    it('should return "date_invalid" error if month is invalid', () => {
        const form = new FormGroup({
            flagDay: new FormControl('10'),
            flagMonth: new FormControl('13'),
            flagYear: new FormControl('')
        });

        form.markAllAsTouched()
        form.controls['flagDay'].markAsDirty()
        form.controls['flagMonth'].markAsDirty()
        form.controls['flagYear'].markAsDirty()

        const result = JohDateValidator.validateJohDate(form);

        expect(result).toEqual({ 'date_invalid': true });
    });

    it('should return "date_invalid" error if year is invalid', () => {
        const form = new FormGroup({
            flagDay: new FormControl('10'),
            flagMonth: new FormControl('3'),
            flagYear: new FormControl('202')
        });
        form.markAllAsTouched()
        form.controls['flagDay'].markAsDirty()
        form.controls['flagMonth'].markAsDirty()
        form.controls['flagYear'].markAsDirty()
        const result = JohDateValidator.validateJohDate(form);

        expect(result).toEqual({ 'date_invalid': true });
    });

    it('should return "date_out_of_support" error if date is before supported date', () => {
        const form = new FormGroup({
            flagDay: new FormControl('10'),
            flagMonth: new FormControl('11'),
            flagYear: new FormControl('2020')
        });
        form.markAllAsTouched()
        form.controls['flagDay'].markAsDirty()
        form.controls['flagMonth'].markAsDirty()
        form.controls['flagYear'].markAsDirty()
        const result = JohDateValidator.validateJohDate(form);

        expect(result).toEqual({ 'date_out_of_support': true });
    });

    it('should return null if date is valid', () => {
        const form = new FormGroup({
            flagDay: new FormControl('12'),
            flagMonth: new FormControl('11'),
            flagYear: new FormControl('2022')
        });
        form.markAllAsTouched()
        form.controls['flagDay'].markAsDirty()
        form.controls['flagMonth'].markAsDirty()
        form.controls['flagYear'].markAsDirty()
        const result = JohDateValidator.validateJohDate(form);

        expect(result).toBeNull();
    });
});