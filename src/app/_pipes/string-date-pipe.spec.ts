import { StringFromDatePipe, StringFromDatePipeYDM } from './string-date-pipe';

describe('StringFromDatePipe', () => {

    let pipe: StringFromDatePipe;

    beforeEach(() => {
        pipe = new StringFromDatePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format date string', () => {
        const dateString = '2020-01-01';
        const formattedDate = pipe.transform(dateString);
        expect(formattedDate).toContain('January 2020');
    });

});


describe('StringFromDatePipeYDM', () => {
    let pipe: StringFromDatePipeYDM;

    beforeEach(() => {
        pipe = new StringFromDatePipeYDM();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format date string in YDM format', () => {
        const dateString = '01/01/2020';
        const formattedDate = pipe.transform(dateString);
        expect(formattedDate).toContain('1 January 2020');
    });
});
