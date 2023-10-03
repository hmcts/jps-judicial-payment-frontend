import { ConvertBooleanPipe } from './convertBoolean-pipe';

describe('ConvertBooleanPipe', () => {
    it('should transform "true" to "Yes"', () => {
        const pipe = new ConvertBooleanPipe();
        const transformedValue = pipe.transform('true');
        expect(transformedValue).toBe('Yes');
    });

    it('should transform "false" to "No"', () => {
        const pipe = new ConvertBooleanPipe();
        const transformedValue = pipe.transform('false');
        expect(transformedValue).toBe('No');
    });

    it('should return an empty string for unknown input', () => {
        const pipe = new ConvertBooleanPipe();
        const transformedValue = pipe.transform('unknown');
        expect(transformedValue).toBe('');
    });
});