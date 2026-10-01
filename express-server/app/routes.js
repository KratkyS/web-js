const express = require('express');
const router = express.Router();

router.get(['/', '/index'], (req, res) => {
  res.render('index');
});

router.get('/hello', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;