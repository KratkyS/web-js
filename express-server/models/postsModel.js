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

exports.pridatPrispevek = (nadpis, obsah, autor) => {
    const prispevky = db.JSON();
    const nextId = prispevky.reduce((max, prispevek) => Math.max(max, Number(prispevek.id) || 0), 0) + 1;

    prispevky.push({
        id: nextId,
        nadpis,
        obsah,
        autor,
    });

    db.JSON(prispevky);
    db.sync();
    return nextId;
};

exports.smazatPrispevek = (id, autor) => {
    const prispevky = db.JSON();
    const prispevek = prispevky.find((prispevek) => String(prispevek.id) === String(id));

    if(!prispevek || prispevek.autor !== autor) {
        return false;
    }

    const filtered = prispevky.filter((prispevek) => String(prispevek.id) !== String(id));
    db.JSON(filtered);
    db.sync();
    return true;
};

exports.smazatPrispevkyUzivatele = (autor) => {
    const prispevky = db.JSON();
    const filtered = prispevky.filter((prispevek) => prispevek.autor !== autor);
    const deletedCount = prispevky.length - filtered.length;

    if(deletedCount > 0) {
        db.JSON(filtered);
        db.sync();
    }

    return deletedCount;
};
