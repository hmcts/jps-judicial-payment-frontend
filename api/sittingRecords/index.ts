import { getConfigValue } from '../configuration';
import { SERVICES_JPS_API_URL } from '../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from '@hmcts/nodejs-logging';
const logger = Logger.getLogger('sittingRecords/index.ts')

const url: string = getConfigValue(SERVICES_JPS_API_URL);

export async function getSittingRecords(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { hmctsServiceCode } = req.query;
    const body = req.body
    logger.debug(`getSittingRecords:: Request to get sitting records with service code: ${hmctsServiceCode}`)
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

export async function addSittingRecords(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { sittingRecords } = req.body;
    const hmctsServiceCode = sittingRecords.recordedSittingRecords[0].hmctsServiceCode;

    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
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
        next(error)
    }

}

export async function deleteSittingRecord(req, res, next){
    const { Authorization, ServiceAuthorization } = req.headers;
    const { id } = req.params
    logger.debug(`deleteSittingRecord:: Request to delete sitting records with sitting record id: ${id}`)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
        };

        const config: AxiosRequestConfig = {
            url: `${url}/sitting-records/sittingRecord/${id}`,
            method: 'DELETE',
            headers: headers,
        };

        const response = await axios(config);

        res.json(response.data);

    } catch (error) {
        next()
    }
}