const validator = require ('./validation_rules');
const rules = (req, res, next) => {
    const valid = {
        itemName: 'required|string',
        type: 'required|string',
        rarity: 'required|string',
        cost: 'required|string',
        description: 'required|string',
        damage: 'required|string',
        weight: 'required|string',
        isMagic: 'required|string',

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