const fetch = require('node-fetch');

const getBars = async ({symbol, start, end}) => {
    try {
        const resp = await fetch(`https://data.alpaca.markets/v1/bars/minute?symbols=${symbol}&start=${start}&end=${end}`, {
            headers: {
                'APCA-API-KEY-ID': process.env.APIKEY,
                'APCA-API-SECRET-KEY': process.env.SECRET
            }
        });
        return resp.json();
    } catch (e) {
        console.log(e);
    }
}

module.exports = getBars;
