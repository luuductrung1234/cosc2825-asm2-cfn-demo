const sequelize = require("sequelize");

/**
 * apply migration
 * @param {sequelize.QueryInterface} queryInterface
 * @param {sequelize} Sequelize
 */
async function up(queryInterface, Sequelize) {
  /**
   * @see https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
   *
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */

  await queryInterface.createTable("products", {
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

  await queryInterface.createTable("attributes", {
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

  await queryInterface.addConstraint("attributes", {
    fields: ["productId"],
    type: "FOREIGN KEY",
    name: "fk_product_id",
    references: {
      table: "products",
      field: "id",
    },
    onDelete: "cascade",
    onUpdate: "cascade",
  });
}

/**
 * revert migration
 * @param {sequelize.QueryInterface} queryInterface
 * @param {sequelize} Sequelize
 */
async function down(queryInterface, Sequelize) {
  /**
   * @see https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
   *
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */

  await queryInterface.dropTable("products");
  await queryInterface.dropTable("attributes");
}

module.exports = { up, down };
