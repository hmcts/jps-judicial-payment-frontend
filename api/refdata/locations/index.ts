import { getConfigValue } from '../../configuration';
import { SERVICES_LOCATION_API_PATH } from '../../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

const url: string = getConfigValue(SERVICES_LOCATION_API_PATH);

export async function getLocations(req, res) {
    const { authorization, serviceauthorization } = req.headers;
    const { searchTerm } = req.body;

    try {
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + authorization,
            'ServiceAuthorization': serviceauthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}`,
            method: 'GET',
            headers: headers
        };

        const response = await axios(config);
     
        res.json(response.data);

    } catch (error) {
        res.status(error.response.status).json({ error: 'An error occurred: '  + error.response.statusText});
    }

}