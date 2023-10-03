import { getConfigValue } from '../configuration';
import { SERVICES_JPS_API_URL } from '../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from '@hmcts/nodejs-logging';
const logger = Logger.getLogger('joh/index.ts')

const url: string = getConfigValue(SERVICES_JPS_API_URL);

export async function getJohAttributes(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { personalCode } = req.params;
    logger.debug(`getJohAttributes:: Request to get JOH attributes with personal code: ${personalCode}`)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/johAttributes/${personalCode}`,
            method: 'GET',
            headers: headers,
        };

        const response = await axios(config);
    
        res.json(response.data);

    } catch (error) {
        next()
    }

}

export async function postJohAttributes(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { personalCode } = req.params;
    const body = req.body
    logger.debug(`postJohAttributes:: Request to post JOH attributes with personal code: ${personalCode}`)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/johAttributes/${personalCode}`,
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
