const Joi = require("joi");
const BaseDto = require("../../../utils/baseDto");

class CompleteOrderDto extends BaseDto {
  constructor() {
    super(
      Joi.object({
        goTo: Joi.string().optional(),
      })
    );
  }
}

module.exports = CompleteOrderDto;
