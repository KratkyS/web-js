// nacteni nastaveni ze souboru .env
require('dotenv').config();

// pouzite nastaveni
const port = process.env.PORT;

// spusteni serveru pro aplikaci
require('http').createServer(require('./app'))
.listen(port, () => {
    // hlaska pri spusteni serveru
    console.log(`Server běží na http://localhost:${port}`);
});
