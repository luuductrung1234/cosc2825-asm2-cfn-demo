const Sequelize = require("sequelize");

const { db } = require("../../connectors/sequelizeConnector");

const productEntity = require("./productEntity");

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const attributeEntity = db().define("attributes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  displayName: {
    type: Sequelize.STRING(500),
    allowNull: false,
  },
  value: {
    type: Sequelize.STRING(500),
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

productEntity.hasMany(attributeEntity, {
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

attributeEntity.belongsTo(productEntity, {
  foreignKey: "productId",
});

module.exports = productEntity;
