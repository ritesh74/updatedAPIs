const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const User = require('../../db/models/users.model');
const userService = require('../../services/user.service');

router.post('/', (req, res) => {

    userService.signupUser(req.body).then(user => {
            res.status(200).send(user);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/login', (req, res) => {
    userService.loginUser(req.body).then(user => {
        res.status(200).send(user);
    }).catch(error => {
        res.status(500).send(error);
    })
})
router.post('/unsubscribe', (req, res) => {
    userService.unsubscribeUser(req.body).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send(err);
    })
})
    
    


module.exports = router;