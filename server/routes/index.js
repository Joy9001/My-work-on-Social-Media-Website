const express = require('express');
const router = express.Router();

// const people = ['Sekiro', 'Emma', 'Isshin', 'Genichiro', 'Lord Kuro', 'Owl'];

router.get('/', (req, res, next) => {
    res.send('Hello World');
});

router.get('/messages', (req, res) => {
    res.render('messages')
})

module.exports = router;




