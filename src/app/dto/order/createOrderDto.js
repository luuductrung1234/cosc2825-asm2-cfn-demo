const Joi = require("joi");
const BaseDto = require("../../../utils/baseDto");

class CreateOrderDto extends BaseDto {
  constructor() {
    super(
      Joi.object({
        customerId: Joi.string().optional().default(null),
        customerName: Joi.string().max(255).required(),
        customerEmail: Joi.string().max(255).required(),
        customerPhone: Joi.string().max(255).required(),
        shippingAddress: Joi.string().max(500).required(),
        orderItems: Joi.array()
          .items(
            Joi.object({
              productId: Joi.number().required(),
              quantity: Joi.number().min(1).required(),
            })
          )
          .min(1),
      })
    );
  }
}

module.exports = CreateOrderDto;
