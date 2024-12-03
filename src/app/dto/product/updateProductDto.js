const Joi = require("joi");
const BaseDto = require("../../../utils/baseDto");

class UpdateProductDto extends BaseDto {
  constructor() {
    super(
      Joi.object({
        title: Joi.string().min(3).max(255).required(),
        category: Joi.string().min(1).max(255).required(),
        imageUrl: Joi.string().max(500).required(),
        description: Joi.string().optional().default(""),
        price: Joi.number().min(0),
        discountPrice: Joi.number()
          .allow(null, "")
          .min(0)
          .optional()
          .default(null),
        recommended: Joi.string().allow("on", "off").default("off"),
        attributeValues: Joi.array()
          .items(
            Joi.object({
              name: Joi.string().required(),
              displayName: Joi.string().required(),
              value: Joi.any().empty("").default(null).optional(),
            })
          )
          .optional()
          .default([]),
      })
    );
  }
}

module.exports = UpdateProductDto;
