import { FormControl } from '@angular/forms';
import { AutoCompleteValidator } from './auto-complete-validator';

describe('AutoCompleteValidator', () => {
    it('should return null if a value is selected', () => {
        const control = new FormControl({ name: 'John' });
        const result = AutoCompleteValidator.requireSelection(control);
        expect(result).toBeNull();
    });

    it('should return an error if no value is selected', () => {
        const control = new FormControl('');
        const result = AutoCompleteValidator.requireSelection(control);
        expect(result).toEqual({ 'value_not_selected': true });
    });

    it('should return an error if a string value is provided', () => {
        const control = new FormControl('John');
        const result = AutoCompleteValidator.requireSelection(control);
        expect(result).toEqual({ 'value_not_selected': true });
    });
});
