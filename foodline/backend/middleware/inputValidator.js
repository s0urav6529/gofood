const {body,validationResult} = require("express-validator")

const createUserAndAdminValidationRules = [
    body('name','Name length  should be minimum 5.').isLength({min:5}),
    body('email','Invalid email').isEmail(),
    body('password','Password length  should be minimum 5.').isLength({min:5}),
]

const loginValidationRules = [
    body('email','Invalid email').isEmail(),
]

const validate = async(req, res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();
};

module.exports = {
    createUserAndAdminValidationRules,
    loginValidationRules,
    validate
}