const validator = require ('./validation_rules');
const rules = (req, res, next) => {
    const valid = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'required|string',
        timeAvailable: 'required|string',
        password: 'required|string',
        phoneNumber: 'required|string',
    };
    validator(req.body, valid, {}, (err,status) => {
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