const { Op } = require("sequelize");

const models = require("../../app/models");
const dbContext = require("../entities");

/**
 * @param query
 * @returns
 * @type {(query: {
 * 	isDeleted: boolean | undefined,
 * 	recommended: boolean | undefined,
 * 	featured: boolean | undefined,
 * 	isDiscount: boolean | undefined,
 * 	searchText: string | undefined,
 * 	pageIndex: number | undefined,
 * 	pageSize: number | undefined,
 * 	sortBy: string | undefined,
 * 	sortDirection: string | undefined})
 * 	=> Promise<{
 *		products: Promise<import("sequelize").Model<any, any>>[],
 *		totalCount: number
 * 	}>}
 */
const listProducts = async (query) => {
  let where = {
    isDeleted: query.isDeleted || false,
  };

  if (query.recommended !== undefined) {
    where.recommended = query.recommended;
  }
  if (query.featured !== undefined) {
    where.featured = query.featured;
  }
  if (query.isDiscount !== undefined) {
    where.discountPrice = { [Op.ne]: null };
  }
  if (query.searchText !== undefined) {
    where.title = { [Op.like]: `%${query.searchText}%` };
  }

  let products = await dbContext.products.findAndCountAll({
    include: [
      {
        model: dbContext.attributes,
        as: "attributes",
        attributes: models.Attribute.getAttributes(),
      },
    ],
    where: where,
    order: [[query.sortBy || "createdAt", query.sortDirection || "DESC"]],
    offset: (query.pageIndex || 0) * (query.pageSize || 8),
    limit: query.pageSize || 8,
    attributes: models.Product.getAttributes(),
  });

  return {
    products: products.rows,
    totalCount: products.count,
  };
};

/**
 * @param id
 * @returns
 * @type {(id: number) => Promise<import("sequelize").Model<any, any>>}
 */
const findById = async (id) => {
  return await models.Product.findByPk(id, {
    attributes: models.Product.getAttributes(),
    include: [
      {
        model: models.Attribute,
        as: "attributes",
        attributes: models.Attribute.getAttributes(),
      },
    ],
  });
};

/**
 * @param product
 * @returns
 * @type {(product: import("../../app/models").Product) => Promise<import("sequelize").Model<any, any>>}
 */
const addProduct = async (product) => {
  return await dbContext.products.create(product);
};

/**
 * @param product
 * @returns
 * @type {(product: import("sequelize").Model<any, any>) => Promise<import("sequelize").Model<any, any>>}
 */
const saveProduct = async (product) => {
  let savedProduct = await product.save();
  return await findById(savedProduct.id);
};

/**
 * @param attribute
 * @returns
 * @type {(attribute: import("../../app/models").Attribute) => Promise<import("sequelize").Model<any, any>>}
 */
const addAttribute = async (attribute) => {
  return await dbContext.attributes.create(attribute);
};

/**
 * @param attributes
 * @returns
 * @type {(attributes: import("../../app/models").Attribute[]) => Promise<import("sequelize").Model<any, any>>[]}
 */
const addAttributes = async (attributes) => {
  return await dbContext.attributes.bulkCreate(attributes, {
    updateOnDuplicate: ["displayName", "value"],
    returning: true,
  });
};

/**
 * @param attribute
 * @returns
 * @type {(attribute: import("sequelize").Model<any, any>) => Promise<import("sequelize").Model<any, any>>}
 */
const saveAttribute = async (attribute) => {
  return await attribute.save();
};

module.exports = {
  listProducts,
  findById,
  addProduct,
  saveProduct,
  addAttribute,
  addAttributes,
  saveAttribute,
};
