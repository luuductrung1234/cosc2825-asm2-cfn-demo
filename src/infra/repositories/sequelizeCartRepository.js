const models = require("../../app/models");
const dbContext = require("../entities");

/**
 * @param cart
 * @returns
 * @type {(cart: import("../../app/models").Cart) => Promise<import("sequelize").Model<any, any>>}
 */
const addCart = async (cart) => {
  return await dbContext.carts.create(cart);
};

/**
 * @param cart
 * @returns
 * @type {(cart: import("sequelize").Model<any, any>) => Promise<import("sequelize").Model<any, any>>}
 */
const saveCart = async (cart) => {
  return await cart.save();
};

/**
 * @param cartItem
 * @returns
 * @type {(cartItems: import("../../app/models").CartItem) => Promise<import("sequelize").Model<any, any>>}
 */
const addCartItem = async (cartItem) => {
  return await dbContext.cartItems.create(cartItem);
};

/**
 * @param cartItems
 * @returns
 * @type {(cartItems: import("../../app/models").CartItem[]) => Promise<import("sequelize").Model<any, any>>[]}
 */
const addCartItems = async (cartItems) => {
  return await dbContext.cartItems.bulkCreate(cartItems, {
    updateOnDuplicate: ["productId", "quantity"],
    returning: true,
  });
};

/**
 * @param cartItem
 * @returns
 * @type {(cartItem: import("sequelize").Model<any, any>) => Promise<import("sequelize").Model<any, any>>}
 */
const saveCartItem = async (cartItem) => {
  return await cartItem.save();
};

/**
 * @param cartItemId
 * @returns
 * @type {(cartItemId: number) => Promise<number>}
 */
const deleteCartItem = async (cartItemId) => {
  return await dbContext.cartItems.destroy({
    where: {
      id: cartItemId,
    },
  });
};

/**
 * @param cartId
 * @returns
 * @type {(cartId: number) => Promise<number>}
 */
const deleteCartItems = async (cartId) => {
  return await dbContext.cartItems.destroy({
    where: {
      cartId: cartId,
    },
  });
};

/**
 * @param customerId
 * @returns
 * @type {(customerId: string) => Promise<import("sequelize").Model<any, any>>}
 */
const loadCart = async (customerId) => {
  return dbContext.carts.findOne({
    where: {
      customerId: customerId,
    },
    include: [
      {
        model: dbContext.cartItems,
        as: "cartItems",
        attributes: models.CartItem.getAttributes(),
      },
    ],
  });
};

module.exports = {
  loadCart,
  addCart,
  saveCart,
  addCartItem,
  addCartItems,
  saveCartItem,
  deleteCartItem,
  deleteCartItems,
};
