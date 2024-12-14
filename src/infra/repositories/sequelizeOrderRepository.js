const models = require("../../app/models");
const dbContext = require("../entities");

/**
 * @param query
 * @returns
 * @type {(query: {customerId: string | undefined,
 * 	sortBy: string | undefined,
 * 	sortDirection: string | undefined})
 * 	=> Promise<import("sequelize").Model<any, any>>[]>}
 */
const listOrders = async (query) => {
  return await dbContext.orders.findAll({
    where: {
      customerId: query.customerId,
    },
    include: [
      {
        model: dbContext.orderItems,
        as: "orderItems",
        attributes: models.OrderItem.getAttributes(),
      },
    ],
    order: [[query.sortBy || "createdAt", query.sortDirection || "DESC"]],
    attributes: models.Order.getAttributes(),
  });
};

/**
 * @param id
 * @returns
 * @type {(id: number) => Promise<import("sequelize").Model<any, any>>}
 */
const findById = async (id) => {
  return await dbContext.orders.findByPk(id, {
    include: [
      {
        model: dbContext.orderItems,
        as: "orderItems",
        attributes: models.OrderItem.getAttributes(),
      },
    ],
  });
};

/**
 * @param order
 * @returns
 * @type {(order: import("../../app/models").Order) => Promise<import("sequelize").Model<any, any>>}
 */
const addOrder = async (order) => {
  return await dbContext.orders.create(order);
};

/**
 * @param order
 * @returns
 * @type {(order: import("sequelize").Model<any, any>) => Promise<import("sequelize").Model<any, any>>}
 */
const saveOrder = async (order) => {
  let savedOrder = order.save();
  return await findById(savedOrder.id);
};

/**
 * @param orderItem
 * @returns
 * @type {(orderItem: import("../../app/models").OrderItem) => Promise<import("sequelize").Model<any, any>>}
 */
const addOrderItem = async (orderItem) => {
  return await dbContext.orderItems.create(orderItem);
};

module.exports = {
  listOrders,
  findById,
  addOrder,
  saveOrder,
  addOrderItem,
};
