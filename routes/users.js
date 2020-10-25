const router = require('express').Router();
const {check} = require('express-validator');

// Middlewares 
const validationResult = require('../middlewares/validationResult');
const auth= require('../middlewares/auth');

// Controller
const usersController = require('../controllers/users.contoller');


router.post('/register',[
    check('name').notEmpty(),
    check('email').isEmail(),
    check('password').notEmpty(),
    validationResult
    
],usersController.register);

router.post('/login',[
    check('email').isEmail(),
    check('password').notEmpty(),
    validationResult

], usersController.login);

router.get('/me',auth, usersController.me);

module.exports = router;
