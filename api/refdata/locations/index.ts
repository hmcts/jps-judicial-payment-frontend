import { getConfigValue } from '../../configuration';
import { SERVICES_LOCATION_API_PATH } from '../../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

const url: string = getConfigValue(SERVICES_LOCATION_API_PATH);

export async function getVenues(req, res, next) {
    const { authorization, serviceauthorization } = req.headers;
    const { searchTerm } = req.body;

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization,
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
        next(error)
    }

}

export async function getRegions(req, res, next) {
    const { authorization, serviceauthorization } = req.headers;
    
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization,
            'ServiceAuthorization': serviceauthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/refdata/location/regions?regionId=ALL`,
            method: 'GET',
            headers: headers
        };

        const response = await axios(config);
        res.json(response.data);
    } catch (error) {
        next(error)
    }

}