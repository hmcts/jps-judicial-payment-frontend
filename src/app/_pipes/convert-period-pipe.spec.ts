import { ConvertToStringPeriodPipe, ConvertAddPeriodPipe } from './convert-period-pipe';

describe('ConvertToStringPeriodPipe', () => {
    
    let pipe: ConvertToStringPeriodPipe;

    beforeEach(() => {
        pipe = new ConvertToStringPeriodPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return "Full Day" if both am and pm are true', () => {
        expect(pipe.transform(true, true)).toEqual('Full day');
    });

    it('should return "Morning" if only am is true', () => {
        expect(pipe.transform(true, false)).toEqual('Morning');
    });

    it('should return "Afternoon" if only pm is true', () => {
        expect(pipe.transform(false, true)).toEqual('Afternoon');
    });

    it('should return empty string if neither am or pm are true', () => {
        expect(pipe.transform(false, false)).toEqual('');
    });

});

describe('ConvertAddPeriodPipe', () => {

    let pipe: ConvertAddPeriodPipe;

    beforeEach(() => {
        pipe = new ConvertAddPeriodPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return "Morning" when passed "AM"', () => {
        expect(pipe.transform('AM')).toEqual('Morning');
    });

    it('should return "Afternoon" when passed "PM"', () => {
        expect(pipe.transform('PM')).toEqual('Afternoon');
    });

    it('should return "Full Day" when passed "FULL_DAY"', () => {
        expect(pipe.transform('FULL_DAY')).toEqual('Full day');
    });

    it('should return empty string when passed invalid value', () => {
        expect(pipe.transform('INVALID')).toEqual('');
    });

});