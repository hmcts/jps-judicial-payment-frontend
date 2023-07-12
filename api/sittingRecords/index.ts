import { getConfigValue } from '../configuration';
import { SERVICES_JPS_API_URL } from '../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

const url: string = getConfigValue(SERVICES_JPS_API_URL);

export async function getSittingRecords(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { hmctsServiceCode } = req.query;
    const body = req.body
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
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
        next()
    }

}