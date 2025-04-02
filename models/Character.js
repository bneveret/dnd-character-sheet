const validator = require ('./validation_rules');
const rules = (req, res, next) => {
    const valid = {
        name: 'required|string',
        species: 'required|string',
        class_type: 'required|string',
        abilities: 'required|string',
        stats: 'required|string',
        level: 'required|string',
        items: 'required|string'
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