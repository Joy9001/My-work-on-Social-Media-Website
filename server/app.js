const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const app = express();

const PORT = process.env.PORT || 3000;
console.log(path.join(__dirname, '../client/public'));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'ejs');

app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
});