const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('users');
});
router.get('/write', (req, res) => {
    res.render('users/write');
});
router.post('/write', (req, res) => {
    res.send(req.body);
});

module.exports = router;
