const model = require('../models/usersModel');
const postsModel = require('../models/postsModel');

exports.oneForm = (req, res) => {
    if(req.session.prihlasenyUzivatel) {
        return res.redirect('/users/profile');
    }

    res.render('users', {
        titulek: 'Uživatelé',
    });
}

exports.uniSign = (req, res) => {
    const jmeno = String(req.body.jmeno || '').trim();
    const heslo = String(req.body.heslo || '');

    if(!jmeno || !heslo) {
        return res.redirect('/users');
    }

    if(model.existujeUzivatel(jmeno)) {
        if(model.spravneHeslo(jmeno, heslo)) {
            req.session.prihlasenyUzivatel = jmeno;
            res.redirect('/users/profile');
        } else {
            // chybne heslo
            res.redirect('/users');
        }
    } else {
        model.pridatUzivatele(jmeno, heslo);
        req.session.prihlasenyUzivatel = jmeno;
        res.redirect('/users/profile');
    }
}

exports.profile = (req, res) => {
    if(!req.session.prihlasenyUzivatel) {
        return res.redirect('/users');
    }

    res.render('profile', {
        titulek: req.session.prihlasenyUzivatel + ' - profil',
        prihlasenyUzivatel: req.session.prihlasenyUzivatel,
        chyba: null,
    });
}

exports.deleteAccount = (req, res, next) => {
    const jmeno = req.session.prihlasenyUzivatel;
    if(!jmeno) {
        return res.redirect('/users');
    }

    const heslo = String(req.body.heslo || '');
    if(!heslo || !model.spravneHeslo(jmeno, heslo)) {
        return res.status(400).render('profile', {
            titulek: jmeno + ' - profil',
            prihlasenyUzivatel: jmeno,
            chyba: 'Zadané heslo není správné. Účet nebyl zrušen.',
        });
    }

    if(!model.odstranitUzivatele(jmeno)) {
        return next(new Error('Přihlášený uživatelský účet se nepodařilo najít.'));
    }

    postsModel.smazatPrispevkyUzivatele(jmeno);

    req.session.destroy((error) => {
        if(error) {
            return next(error);
        }

        res.redirect('/users');
    });
}

exports.getOut = (req, res) => {
    req.session.destroy();
    res.redirect('/users');
}
