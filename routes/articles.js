const router = require('express').Router();
const {check} = require('express-validator');

// Middlewares 
const validationResult = require('../middlewares/validationResult');
const auth= require('../middlewares/auth');

// Controller
const articlesController = require('../controllers/articles.controller');



router.get('/',articlesController.findAll);

//Handelling HTTP get requests
router.get('/:id',articlesController.findByID);

router.post('/',
    [
        auth,
        check('title').notEmpty(),
        check('content').isLength({min:5}),
        validationResult
        
    ],articlesController.create);

router.put('/:id',
    [
        auth,
        validationResult,
        check('title').notEmpty(),
        check('content').isLength({min:5})
        
    ],articlesController.update);

router.delete('/:id',auth,articlesController.delete);

module.exports = router;
