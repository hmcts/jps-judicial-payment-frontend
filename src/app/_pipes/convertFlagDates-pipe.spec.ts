import { ConvertFlagDateToString } from './convertFlagDates-pipe';

describe('ConvertFlagDateToString', () => {
    let pipe: ConvertFlagDateToString;

    beforeEach(() => {
        pipe = new ConvertFlagDateToString();
    });

    it('should transform flagDate to string in the format "DD/MM/YYYY"', () => {
        const flagDate = {
            flagDay: 10,
            flagMonth: 5,
            flagYear: 2022
        };

        const transformedDate = pipe.transform(flagDate);

        expect(transformedDate).toEqual('10/05/2022');
    });
});