// nacteni kodu balicku databaze
const jsondb = require('simple-json-db');
const path = require('path');
// vytvoreni databaze z datoveho souboru na disku
const db = new jsondb(path.join(__dirname, '../data/posts.json'));

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

exports.pridatPrispevek = (nadpis, obsah) => {
    const prispevky = db.JSON();
    const nextId = prispevky.reduce((max, prispevek) => Math.max(max, Number(prispevek.id) || 0), 0) + 1;

    prispevky.push({
        id: nextId,
        nadpis,
        obsah,
    });

    db.JSON(prispevky);
    return nextId;
};

exports.smazatPrispevek = (id) => {
    const prispevky = db.JSON();
    const filtered = prispevky.filter((prispevek) => String(prispevek.id) !== String(id));

    db.JSON(filtered);
    return filtered.length !== prispevky.length;
};
