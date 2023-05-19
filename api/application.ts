import * as express from 'express';
import { getXuiNodeMiddleware } from './auth';
import axios, { AxiosRequestConfig } from 'axios';

export const app = express();
app.use(express.json())

app.post('/test', async (req, res) => {
    const { S2S, AUTH, SEARCHSTRING } = req.body;
    try {
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + AUTH,
            'ServiceAuthorization': S2S
        };

        const config: AxiosRequestConfig = {
            url: `http://rd-location-ref-api-aat.service.core-compute-aat.internal/refdata/location/court-venues/venue-search?search-string=${SEARCHSTRING}`,
            method: 'GET',
            headers: headers
        };

        const response = await axios(config);
        console.log('Post call return');
        console.log(response.data);

        res.json(response.data);

    } catch (error) {
        res.status(error.response.status).json({ error: 'An error occurred: '  + error.response.statusText});
    }
})

app.use(getXuiNodeMiddleware());