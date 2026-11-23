const model = require('../models/usersModel');

exports.oneForm = (req, res) => {
    if(req.session.prihlasenyUzivatel) {
        return res.redirect('/users/profile');
    }

    res.render('users', {
        titulek: 'Uživatelé',
    });
}

exports.uniSign = (req, res) => {
    const jmeno = req.body.jmeno;
    const heslo = req.body.heslo;

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
    });
}

exports.getOut = (req, res) => {
    req.session.destroy();
    res.redirect('/users');
}
