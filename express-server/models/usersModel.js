const bcrypt = require('bcryptjs');
const jsondb = require('simple-json-db');
const path = require('path');

const db = new jsondb(path.join(__dirname, '..', 'data', 'users.json'));

exports.existujeUzivatel = (jmeno) => {
    return db.has(jmeno);
}

exports.spravneHeslo = (jmeno, heslo) => {
    if(!db.has(jmeno)) {
        return false;
    }

    const uzivatel = db.get(jmeno);

    return bcrypt.compareSync(heslo, uzivatel.heslo);
}

exports.pridatUzivatele = (jmeno, heslo) => {
    if(db.has(jmeno)) {
        return false;
    }

    db.set(jmeno, {
        heslo: bcrypt.hashSync(heslo, 10),
    });

    db.sync();
    return true;
}

exports.odstranitUzivatele = (jmeno) => {
    if(!db.has(jmeno)) {
        return false;
    }

    db.delete(jmeno);
    db.sync();
    return true;
}
