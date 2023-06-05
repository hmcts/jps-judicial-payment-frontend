import { getConfigValue } from '../../configuration';
import { SERVICES_USER_API_PATH } from '../../configuration/references';
import axios, { AxiosRequestConfig } from 'axios';

const url: string = getConfigValue(SERVICES_USER_API_PATH);

export async function getUsers(req, res) {
    const { authorization, serviceauthorization } = req.headers;
    const { searchObject } = req.body;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization,
            'ServiceAuthorization': serviceauthorization
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
        res.status(error.response.status).json({ error: 'An error occurred: '  + error.response.statusText});
    }

}

export async function getUserInfo(req, res) {
    const { authorization, serviceauthorization } = req.headers;
    const { userCode } = req.body;
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authorization,
            'ServiceAuthorization': serviceauthorization
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
        res.status(error.response.status).json({ error: `An error occurred: ${error.response.statusText}; error message: ${error.response.data.errorMessage}`});
    }

}