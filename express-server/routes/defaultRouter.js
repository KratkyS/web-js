// zavislosti
const model = require('../models/postsModel.js');

// priprava routeru
const router = require('express').Router();

// custom URL s custom odpovedi
router.get('/hello', (req, res) => {
	res.send('Hello World from Express!');
});

// custom URL s EJS sablonou
router.get(['/','/index'], (req, res) => {
	res.render('index', {
		titulek: 'Můj web',
		jmeno: 'Šimon',
		datum: new Date().toLocaleDateString(),
	});
});

router.get('/posts/:id', (req, res) => {
	// vyzvednuti parametru z URL
	const id = req.params.id;
	// nacteni dat pomoci modelu
	const prispevek = model.nacistPrispevek(id);

	res.render('post', {
		titulek: 'Příspěvek',
		prispevek: prispevek,
	});
});

router.get('/posts', (req, res) => {
	res.render('posts', {
		titulek: 'Příspěvky',
		prispevky: model.nacistPrispevky(),
	});
});

// vsechny ostatni URL jsou chyba
router.use((req, res) => {
    res.render('error', {
		titulek: 'Chyba',
	});
});

// exportovani routeru pro pouziti v aplikaci
module.exports = router;
