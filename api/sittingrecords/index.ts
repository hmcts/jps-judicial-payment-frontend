import { getConfigValue } from '../configuration';
import { SERVICES_JPS_API_URL } from '../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

const url: string = getConfigValue(SERVICES_JPS_API_URL);

export async function addSittingRecords(req, res) {
    const { authorization, serviceauthorization } = req.headers;
    const { sittingRecords } = req.body;
    const hmctsServiceCode = sittingRecords.recordedSittingRecords[0].hmctsServiceCode;

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization,
            'ServiceAuthorization': serviceauthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/recordSittingRecords/${hmctsServiceCode}`,
            method: 'POST',
            headers: headers,
            data: sittingRecords
        };

        //const response = await axios(config);
    
        const resObj = {
            "errorRecords": [{
                "postedRecord": {
                    "hmctsServiceCode": "ABC123",
                    "sittingDate": "2023-06-21",
                    "epimmsId": "EPI456",
                    "personalCode": "PERS789",
                    "contractTypeId": "CONTRACT1",
                    "judgeRoleTypeId": "JUDGE2",
                    "AM": true,
                    "PM": false,
                    "replaceDuplicate": true
                },
                "errorCode": "ERR123",
                "createdByName": "John Doe",
                "createdDateTime": "2023-06-20T09:30:00Z",
                "statusId": "POTENTIALDUPLICATERECORD"
            }, {
                "postedRecord": {
                    "hmctsServiceCode": "XYZ789",
                    "sittingDate": "2023-06-22",
                    "epimmsId": "EPI123",
                    "personalCode": "PERS456",
                    "contractTypeId": "CONTRACT2",
                    "judgeRoleTypeId": "JUDGE1",
                    "AM": false,
                    "PM": true,
                    "replaceDuplicate": false
                },
                "errorCode": "ERR456",
                "createdByName": "Jane Smith",
                "createdDateTime": "2023-06-20T14:45:00Z",
                "statusId": "INVALIDDUPLICATERECORD"
            }]
        }

        res.json(resObj);

    } catch (error) {
        res.status(error.response.status).json({ error: 'An error occurred: '  + error.response.statusText});
    }

}