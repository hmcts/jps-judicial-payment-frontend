import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

const url = 'http://localhost:4550'

export async function getSittingRecords(req, res) {
    const { authorization, serviceauthorization } = req.headers;
    const { hmctsServiceCode } = req.query;
    const body = req.body
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization,
            'ServiceAuthorization': serviceauthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/sitting-records/searchSittingRecords/${hmctsServiceCode}`,
            method: 'POST',
            headers: headers,
            data: body
        };

        const response = await axios(config);
     
        res.json(response.data);

    } catch (error) {
        console.log(error)
        res.status(error.response.status).json({ error: 'An error occurred: '  + error.response.statusText});
    }

}