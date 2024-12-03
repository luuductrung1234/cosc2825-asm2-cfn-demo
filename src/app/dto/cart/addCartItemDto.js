const Joi = require("joi");
const BaseDto = require("../../../utils/baseDto");

class AddCartItemDto extends BaseDto {
  constructor() {
    super(
      Joi.object({
        productId: Joi.number().min(1).required(),
        quantity: Joi.number().min(1).required(),
        goTo: Joi.string().optional(),
      })
    );
  }
}

module.exports = AddCartItemDto;
