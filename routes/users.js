const express = require('express');
const router = express.Router();
const Realm = require('realm');


const PostSchema = {
    name: 'User',
    properties: {
        name: 'string',
        age: 'int',
        createdAt: 'date'
    }
};
const userRealm = new Realm({
    path: 'user.realm',
    schema: [PostSchema]
});

const getUsers = () => {
    return userRealm.objects('User').sorted('createdAt', true);
};


/* GET users listing. */
router.get('/', (req, res, next) => {
    const users = getUsers();
    res.render('users', {
        users
    });
});
router.get('/new', (req, res) => {
    res.render('users/new');
});
router.post('/new', (req, res) => {
    const name = req.body['name'],
        age = parseInt(req.body['age']),
        createdAt = new Date();

    userRealm.write(() => {
        userRealm.create('User', {
            name,
            age,
            createdAt
        });
    });

    const users = getUsers();
    res.render('users', {
        notice: 'Success!!',
        users
    });
});

module.exports = router;
