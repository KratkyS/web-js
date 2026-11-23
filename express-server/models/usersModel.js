const bcrypt = require('bcryptjs');
const jsondb = require('simple-json-db');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'users.json');
const loadDb = () => new jsondb(dbPath);

exports.existujeUzivatel = (jmeno) => {
    const db = loadDb();
    return db.has(jmeno);
}

exports.spravneHeslo = (jmeno, heslo) => {
    const db = loadDb();
    if(!db.has(jmeno)) {
        return false;
    }

    const uzivatel = db.get(jmeno);

    return bcrypt.compareSync(heslo, uzivatel.heslo);
}

exports.pridatUzivatele = (jmeno, heslo) => {
    const db = loadDb();
    if(db.has(jmeno)) {
        return false;
    }

    db.set(jmeno, {
        heslo: bcrypt.hashSync(heslo, 10),
    });

    return true;
}

exports.odstranitUzivatele = (jmeno) => {
    const db = loadDb();
    if(!db.has(jmeno)) {
        return false;
    }

    return db.delete(jmeno) === true;
}
