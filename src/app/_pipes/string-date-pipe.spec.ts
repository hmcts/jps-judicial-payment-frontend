import { StringFromDatePipe } from './string-date-pipe';

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
