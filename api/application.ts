import * as express from 'express';
import { getXuiNodeMiddleware } from './auth';
import axios, { AxiosRequestConfig } from 'axios';

export const app = express();
app.use(express.json())

app.post('/test', async (req, res) => {
    console.log('1233')
    console.log(req.body)
    //`http://rd-location-ref-api-aat.service.core-compute-aat.internal/refdata/location/court-venues/venue-search?search-string=${searchTerm}`

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

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
})

app.use(getXuiNodeMiddleware());