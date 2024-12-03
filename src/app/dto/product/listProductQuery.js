const Joi = require("joi");
const BaseQuery = require("../../../utils/baseQuery");

class ListProductQuery extends BaseQuery {
  constructor() {
    super(
      Joi.object({
        searchText: Joi.string().empty("").default(null).optional(),
        sortBy: Joi.string()
          .optional()
          .default("createdAt")
          .valid("title", "createdAt", "price"),
        sortDirection: Joi.string()
          .optional()
          .default("DESC")
          .valid("ASC", "DESC"),
        pageIndex: Joi.number().optional().default(0),
        pageSize: Joi.number().optional().default(12),
      })
    );
  }
}

module.exports = ListProductQuery;
