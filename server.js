let express = require('express');
let config = require('dotenv').config();
let cors = require('cors');
const request = require('request-promise');

let app = express();
let port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
            'start': '1',
            'limit': '100',
            'convert': 'INR'
        },
        headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY
        },
        json: true,
        gzip: true
    };

    request(requestOptions).then(response => {
        res.json(response);
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
});

app.listen(port, () => console.log('Listening to port:', port));