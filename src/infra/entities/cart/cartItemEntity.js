const Sequelize = require("sequelize");

const { db } = require("../../configs/sequelizeConfig");

const productEntity = require("../product/productEntity");
const cartEntity = require("./cartEntity");

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const cartItemEntity = db().define("cartItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validator: {
      min: 1,
    },
  },
});

cartEntity.hasMany(cartItemEntity, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

productEntity.hasMany(cartItemEntity, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

cartItemEntity.belongsTo(cartEntity, {
  foreignKey: "cartId",
});

cartItemEntity.belongsTo(productEntity, {
  foreignKey: "productId",
});

module.exports = cartItemEntity;