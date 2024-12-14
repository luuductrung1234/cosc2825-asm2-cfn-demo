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

  let attributesWhere = undefined;

  let having = {};

  if (query.recommended !== undefined && query.recommended !== null) {
    where.recommended = query.recommended;
  }
  if (query.featured !== undefined && query.featured !== null) {
    attributesWhere = { name: "featured" };
    having["attributes.name"] = "featured";
  }
  if (query.isDiscount !== undefined && query.isDiscount !== null) {
    where.discountPrice = { [Op.ne]: null };
  }
  if (query.searchText !== undefined && query.searchText !== null) {
    where.title = { [Op.like]: `%${query.searchText}%` };
  }

  try {
    let products = await dbContext.products.findAll({
      where: where,
      subQuery:
        query.pageIndex !== undefined && query.pageIndex !== null
          ? true
          : false,
      include: [
        {
          model: dbContext.attributes,
          as: "attributes",
          attributes: models.Attribute.getAttributes(),
        },
      ],
      having: having,
      order: [[query.sortBy || "createdAt", query.sortDirection || "DESC"]],
      offset: (query.pageIndex || 0) * (query.pageSize || 1000),
      limit: query.pageSize || 1000,
      attributes: models.Product.getAttributes(),
    });

    let count = await dbContext.products.count({
      where: where,
      subQuery: false,
      distinct: true,
      col: "id",
      include: [
        {
          model: dbContext.attributes,
          as: "attributes",
          attributes: models.Attribute.getAttributes(),
          required: attributesWhere ? true : false,
          where: attributesWhere,
        },
      ],
    });

    return {
      products: products,
      totalCount: count,
    };
  } catch (error) {
    console.error(error);
    return { products: [], totalCount: 0 };
  }
};

/**
 * @param id
 * @returns
 * @type {(id: number) => Promise<import("sequelize").Model<any, any>>}
 */
const findById = async (id) => {
  return await dbContext.products.findByPk(id, {
    attributes: models.Product.getAttributes(),
    include: [
      {
        model: dbContext.attributes,
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
