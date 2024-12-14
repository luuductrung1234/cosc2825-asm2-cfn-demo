const Sequelize = require("sequelize");

const { db } = require("../../connectors/sequelizeConnector");

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const orderEntity = db().define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  customerName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  customerEmail: {
    type: Sequelize.STRING(255),
    allowNull: true,
    validator: {
      isEmail: true,
    },
  },
  customerPhone: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  shippingAddress: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.STRING(255),
    allowNull: false,
    defaultValue: "system",
  },
  updatedBy: {
    type: Sequelize.STRING(255),
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn("NOW"),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

module.exports = orderEntity;
