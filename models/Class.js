const validator = require ('./validation_rules');
const rules = (req, res, next) => {
    const valid = {
        className: 'required|string',
        hitDie: 'required|string',
        primaryAttribute: 'required|string',
        savingThrows: 'required|string',
        proficiency: 'required|string',
        hitpointsAtFirstLevel: 'required|string',
        spellCastingAttribute: 'required|string',
        spellsKnown: 'required|string',
        cantripsKnown: 'required|string',
        spellSlotsPerLevel: 'required|string',

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