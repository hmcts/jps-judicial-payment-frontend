import { getConfigValue } from "api/configuration"
import {
    JPS_SYSTEM_USERNAME,
    JPS_SYSTEM_PASSWORD,
    SERVICES_IDAM_API_URL,
    SERVICES_IDAM_OAUTH_CALLBACK_URL,
    SERVICES_IDAM_CLIENT_ID,
    IDAM_SECRET,
    MICROSERVICE,
    SERVICES_S2S_PATH
} from '../../configuration/references';
import axios from "axios";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
    access_token?: string;
    s2s_token?: string;
}

export class IdamAuthenticatorService {
    idamAccessToken;
    s2sAccessToken; 

    assignTokensMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
        
        req.access_token = `Bearer ${this.idamAccessToken}`;
        req.s2s_token = `Bearer ${this.s2sAccessToken}`;
        next();
    }

    async createSystemUserAuth() {
        const IMPORTER_USERNAME = getConfigValue(JPS_SYSTEM_USERNAME);
        const IMPORTER_PASSWORD = getConfigValue(JPS_SYSTEM_PASSWORD);
        const IDAM_URI          = getConfigValue(SERVICES_IDAM_API_URL);
        const REDIRECT_URI      = `https://jps-judicial-payment-frontend-aat.service.core-compute-aat.internal${getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL)}`;
        const CLIENT_ID         = getConfigValue(SERVICES_IDAM_CLIENT_ID);
        const CLIENT_SECRET     = getConfigValue(IDAM_SECRET);

        const userCode = await this.handleAuthPostReq(`${IDAM_URI}/oauth2/authorize?redirect_uri=${REDIRECT_URI}&response_type=code&client_id=${CLIENT_ID}`, IMPORTER_USERNAME, IMPORTER_PASSWORD)
        const idamAuthCode = await this.handleAuthPostReq(`${IDAM_URI}/oauth2/token?code=${userCode.code}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`, CLIENT_ID, CLIENT_SECRET)
        this.idamAccessToken = idamAuthCode.access_token
    }
    async createS2SAuth(){
        const S2S_MICROSERVICE  = getConfigValue(MICROSERVICE)
        const S2S_URL           = `${getConfigValue(SERVICES_S2S_PATH)}/testing-support/lease`

        const s2sToken = await this.handleS2SPostReq(S2S_URL, {microservice: S2S_MICROSERVICE})
        this.s2sAccessToken = s2sToken
    }
    async handleAuthPostReq(postUrl, uName, uPass){
        return axios.post(postUrl, "", {
            auth:{
                username: uName,
                password: uPass
            }
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error(error);
            return error
        });
    }
    async handleS2SPostReq(postUrl, data){
        return axios.post(postUrl, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error(error);
            return error
        });
    }
}