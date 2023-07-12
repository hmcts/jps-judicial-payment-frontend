import { ConvertToStringPeriodPipe } from './convert-period-pipe';

describe('ConvertToStringPeriodPipe', () => {
    
    let pipe: ConvertToStringPeriodPipe;

    beforeEach(() => {
        pipe = new ConvertToStringPeriodPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return "Full Day" if both am and pm are true', () => {
        expect(pipe.transform('AM', 'PM')).toEqual('Full Day');
    });

    it('should return "Morning" if only am is true', () => {
        expect(pipe.transform('AM', '')).toEqual('Morning');
    });

    it('should return "Afternoon" if only pm is true', () => {
        expect(pipe.transform('', 'PM')).toEqual('Afternoon');
    });

    it('should return empty string if neither am or pm are true', () => {
        expect(pipe.transform('', '')).toEqual('');
    });

});
