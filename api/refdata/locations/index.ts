import { getConfigValue } from '../../configuration';
import { SERVICES_LOCATION_API_PATH } from '../../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from '@hmcts/nodejs-logging';
const logger = Logger.getLogger('refdata/index.ts')

const url: string = getConfigValue(SERVICES_LOCATION_API_PATH);

export async function getLocations(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { searchTerm } = req.body;

    logger.debug(`getLocations:: request made to get location with term: ${searchTerm}`)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
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
    const { Authorization, ServiceAuthorization } = req.headers;
    
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
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