// model odstinuje praci s daty
const model = require('../models/postsModel.js');

// zobrazeni vsech prispevku
exports.allPosts = (req, res) => {
	res.render('posts', {
		titulek: 'Příspěvky',
		prispevky: model.nacistPrispevky(),
		prihlasenyUzivatel: req.session.prihlasenyUzivatel,
	});
}

// zobrazeni konkretniho prispevku
exports.showPost = (req, res) => {
	// vyzvednuti parametru z URL
	const id = req.params.id;
	// nacteni dat pomoci modelu
	const prispevek = model.nacistPrispevek(id);

	res.render('post', {
		titulek: 'Příspěvek',
		prispevek: prispevek,
		prihlasenyUzivatel: req.session.prihlasenyUzivatel,
	});
}

// odebrani konkretniho prispevku
exports.deletePost = (req, res) => {
    const autor = req.session.prihlasenyUzivatel;
    if(!autor) {
        return res.redirect('/users');
    }

    // vyzvednuti parametru z URL
    const id = req.params.id;
    
    if(!model.smazatPrispevek(id, autor)) {
        return res.redirect('/posts');
    }

    // presmerovani opet na vypis
    res.redirect('/posts');
}

exports.addPost = (req, res) => {
    const autor = req.session.prihlasenyUzivatel;
    if(!autor) {
        return res.redirect('/users');
    }

    // vyzvednuti dat z tela POST pozadavku
    const nadpis = req.body.nadpis;
    const obsah = req.body.obsah;

    if(!nadpis || !obsah) {
        return res.redirect('/posts');
    }

    // pridavani zajistuje model
    model.pridatPrispevek(nadpis, obsah, autor);

    // presmerovani opet na vypis
    res.redirect('/posts');
}
