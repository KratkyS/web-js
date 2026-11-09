// nacteni kodu balicku databaze
const jsondb = require('simple-json-db');
// vytvoreni databaze z datoveho souboru na disku
const db = new jsondb('../data/posts.json');

// nabizena funkcnost modelu
exports.nacistPrispevky = () => {
    return db.JSON();
}

exports.nacistPrispevek = (id) => {
    const prispevky = db.JSON();

    for(let i = 0; i < prispevky.length; i++) {
        if(prispevky[i].id == id) {
            return prispevky[i];
        }
    }

    return false;
};