// nacteni nastaveni ze souboru .env
require('dotenv').config();

const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
