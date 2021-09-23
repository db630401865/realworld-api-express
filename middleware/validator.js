const { validationResult, buildCheckFunction } = require('express-validator');
const { isValidObjectId } = require('mongoose')

exports = module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}; 

exports.isValidObjdectId = (lacation, fields) =>{
  return buildCheckFunction(lacation)(fields).custom(async value=>{
    if(!isValidObjectId(value)){
      return Promise.reject('ID格式错误')
    }
  })
}