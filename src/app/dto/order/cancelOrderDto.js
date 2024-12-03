const Joi = require("joi");
const BaseDto = require("../../../utils/baseDto");

class CancelOrderDto extends BaseDto {
  constructor() {
    super(
      Joi.object({
        goTo: Joi.string().optional(),
      })
    );
  }
}

module.exports = CancelOrderDto;
