const Joi = require("joi");
const BaseDto = require("../../../utils/baseDto");

class RemoveCartItemDto extends BaseDto {
  constructor() {
    super(
      Joi.object({
        productId: Joi.number().min(1).required(),
      })
    );
  }
}

module.exports = RemoveCartItemDto;
