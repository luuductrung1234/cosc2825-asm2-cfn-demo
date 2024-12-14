const Sequelize = require("sequelize");

const { db } = require("../../connectors/sequelizeConnector");

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const productEntity = db().define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(2000),
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  discountPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  category: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  recommended: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

module.exports = productEntity;
