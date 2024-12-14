const Sequelize = require("sequelize");

const { db } = require("../../connectors/sequelizeConnector");

const productEntity = require("../product/productEntity");
const orderEntity = require("./orderEntity");

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const orderItemEntity = db().define("orderItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
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
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

orderEntity.hasMany(orderItemEntity, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

productEntity.hasMany(orderItemEntity, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

orderItemEntity.belongsTo(orderEntity, {
  foreignKey: "orderId",
});

orderItemEntity.belongsTo(productEntity, {
  foreignKey: "productId",
});

module.exports = orderItemEntity;
