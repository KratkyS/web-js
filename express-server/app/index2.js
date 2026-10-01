const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("web"));

app.set('view engine', 'ejs');
app.set('views', './views');
app.get(['/', '/index'], (req, res) => {
  res.render('index');
});
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});