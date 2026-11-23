// zavislosti
const controller = require('../controllers/defaultController.js');

// priprava routeru
const router = require('express').Router();

router.use('/posts', require('./postsRouter.js'));
// indexova stranka cele aplikace
router.get(['/','/index'], controller.index);
router.get('/about', controller.about);
// stejne tka URL spojene s uzivateli maji vlastni router
router.use('/users', require('./usersRouter.js'));
// jakakoli jina URL je chybou
router.use(controller.error);
// exportovani routeru pro pouziti v aplikaci
module.exports = router;
