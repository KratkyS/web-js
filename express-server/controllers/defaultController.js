// indexova stranka
exports.index = (req, res) => {
	res.render('index', {
		titulek: 'Můj web',
		jmeno: 'Jakub Šenkýř',
		datum: new Date().toLocaleDateString(),
	});
}

// chybova stranka
exports.error = (req, res) => {
    res.render('error', {
		titulek: 'Chyba',
	});
}
