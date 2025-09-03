const fs = require('fs');
const https = require('https');
const axios = require('axios');

const ca = fs.readFileSync('C:\\Users\\<you>\\AppData\\Local\\mkcert\\rootCA.pem');

const httpsAgent = new https.Agent({ ca }); // keep verification ON, but trust mkcert
axios.get('https://apikey.phanmemmkt.vn/api/v1/auth/profile', { httpsAgent });
