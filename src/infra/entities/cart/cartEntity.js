const Sequelize = require("sequelize");

const { db } = require("../../connectors/sequelizeConnector");

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const cartEntity = db().define("carts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

module.exports = cartEntity;
