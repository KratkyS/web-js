// indexova stranka
exports.index = (req, res) => {
	res.render('index', {
		titulek: 'Můj web',
		jmeno: 'Jakub Šenkýř',
		datum: new Date().toLocaleDateString(),
	});
}

// stranka o webu
exports.about = (req, res) => {
    res.render('about', {
        titulek: 'O webu',
    });
}

// chybova stranka
exports.error = (req, res) => {
    res.render('error', {
		titulek: 'Chyba',
	});
}
