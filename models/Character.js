const validateRules = require ('./validation_rules');
const rules = (req, res, next) => {
    const valid = {
        firstName: 'required|string',
        lastName: 'required|string',  
        species: 'required|email',
        alignment: 'required|string',
        birthday: 'required|string',
    };
    validateRules(req.body, valid, {}, (err,status) => {
        if (!status){
            res.status(412).send({
                success: false,
                message: 'Validation Failed',
                data: err
            });
        }else {
            next();
        }
    });
};
module.exports = { rules };