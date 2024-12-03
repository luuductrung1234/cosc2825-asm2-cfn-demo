const Joi = require("joi");
const BaseParams = require("../../../utils/baseParams");

class FindOrderParams extends BaseParams {
  constructor() {
    super(
      Joi.object({
        id: Joi.number().min(1).required(),
      })
    );
  }
}

module.exports = FindOrderParams;
