import { getConfigValue } from '../../configuration';
import { SERVICES_USER_API_PATH } from '../../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';
import { IdamAuthenticatorService } from '../authenticator/index';

const idamAuthSvc = new IdamAuthenticatorService;
const url: string = getConfigValue(SERVICES_USER_API_PATH);

export async function getUsers(req, res, next) {
    const { Authorization, ServiceAuthorization } = req.headers;
    const { searchObject } = req.body;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': Authorization,
            'ServiceAuthorization': ServiceAuthorization
        };
        const config: AxiosRequestConfig = {
            url: `${url}/refdata/judicial/users/search`,
            method: 'POST',
            headers: headers,
            data: searchObject
        };
        const response = await axios(config);
    
        res.json(response.data);
    } catch (error) {
        next(error)
    }

}

export async function getUserInfo(req, res, next) {
    const { access_token, s2s_token } = req;
    const { userCode } = req.body;
    try {
        const headers = {
            'Content-Type': 'application/vnd.jrd.v2+json',
            'Authorization': access_token,
            'ServiceAuthorization': s2s_token,
        };
        const config: AxiosRequestConfig = {
            url: `${url}/refdata/judicial/users`,
            method: 'POST',
            headers: headers,
            data: userCode
        };
        const response = await axios(config);
        
        res.json(response.data);
    } catch (error) {
        next(error)
    }

}