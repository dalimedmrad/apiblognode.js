const {validationResult} = require('express-validator')
const boom = require('boom');

module.exports = function(req,res,next){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // return res.status(400).json({
        //     status:400,
        //     errors:errors.array()
        // })
        return next(boom.badRequest(errors.array()[0].msg));
    } else {
        next();
    }
}