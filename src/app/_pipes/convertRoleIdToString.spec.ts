import { ConvertRoleIdToString } from './convertRoleIdToString';

describe('ConvertRoleIdToString', () => {
    let pipe: ConvertRoleIdToString;

    beforeEach(() => {
        pipe = new ConvertRoleIdToString()
    });

    it('should transform roleId to role string', () => {
        const roleId = '1';
        const transformedRole = pipe.transform(roleId);
        expect(transformedRole).toBe('President of Tribunal');
    });

    it('should return an empty string if roleId is empty string', () => {
        const roleId = '';
        const transformedRole = pipe.transform(roleId);
        expect(transformedRole).toBe('');
    });

});