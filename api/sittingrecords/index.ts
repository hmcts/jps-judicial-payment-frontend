import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

//const url: string = getConfigValue(SERVICES_LOCATION_API_PATH);
const url: string = '';

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

        const response = await axios(config);
     
        res.json(response.data);

    } catch (error) {
        res.status(error.response.status).json({ error: 'An error occurred: '  + error.response.statusText});
    }

}