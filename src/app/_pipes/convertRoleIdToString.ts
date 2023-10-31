import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertRoleIdToString'
})
export class ConvertRoleIdToString implements PipeTransform {

    roleTypeMap: Record<string, number> = {
        'President of Tribunal': 1,
        'Regional Tribunal Judge': 2,
        'Tribunal Judge': 3,
        'Tribunal Member Medical': 4,
        'Tribunal Member Disability': 5,
        'Tribunal Member Lay': 6,
        'Tribunal Member Financial': 7,
        'Circuit Judge': 8,
        'Deputy Circuit Judge': 9,
        'Deputy District Judge- Sitting in Retirement': 10,
        'Deputy High Court Judge': 11,
        'District Judge': 12,
        'District Judge (MC)': 13,
        'Recorder': 14,
        'Deputy Upper Tribunal Judge': 15
    };

    transform(roleId: string): string {
        if (!roleId) return '';  // if the string is null or undefined, return an empty string
        const roleIdInt = Number(roleId)
        const role = Object.entries(this.roleTypeMap).find(([, value]) => value === roleIdInt);
        return role ? role[0] : '';
    }

}

