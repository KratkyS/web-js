// model odstinuje praci s daty
const model = require('../models/postsModel.js');

// zobrazeni vsech prispevku
exports.allPosts = (req, res) => {
	res.render('posts', {
		titulek: 'Příspěvky',
		prispevky: model.nacistPrispevky(),
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
	});
}

// odebrani konkretniho prispevku
exports.deletePost = (req, res) => {
    // vyzvednuti parametru z URL
    const id = req.params.id;
    
    // smazani provadi model
    model.smazatPrispevek(id);

    // presmerovani opet na vypis
    res.redirect('/posts');
}

exports.addPost = (req, res) => {
    // vyzvednuti dat z tela POST pozadavku
    const nadpis = req.body.nadpis;
    const obsah = req.body.obsah;

    if(!nadpis || !obsah) {
        return res.redirect('/posts');
    }

    // pridavani zajistuje model
    model.pridatPrispevek(nadpis, obsah);

    // presmerovani opet na vypis
    res.redirect('/posts');
}
