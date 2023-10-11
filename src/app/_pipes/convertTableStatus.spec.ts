import { CapitalizeFirstLetterPipe } from './convertTableStatus';

describe('ConvertRoleIdToString', () => {
    let pipe: CapitalizeFirstLetterPipe;

    beforeEach(() => {
        pipe = new CapitalizeFirstLetterPipe()
    });

    it('should transform upper case status to only first letter status string', () => {
        const tableStatus = 'RECORDED';
        const transformedRole = pipe.transform(tableStatus);
        expect(transformedRole).toBe('Recorded');
    });

    it('should return empty string if empty string is passed', () => {
        const tableStatus = '';
        const transformedRole = pipe.transform(tableStatus);
        expect(transformedRole).toBe('');
    });

});