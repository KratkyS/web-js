const controller = require('../controllers/usersController.js');
const router = require('express').Router();

router.get('/', controller.oneForm);
router.post('/sign', controller.uniSign);
router.get('/profile', controller.profile);
router.post('/signout', controller.getOut);
router.post('/delete', controller.deleteAccount);

module.exports = router;
