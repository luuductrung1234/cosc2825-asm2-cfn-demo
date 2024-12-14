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

  await queryInterface.createTable("carts", {
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

  await queryInterface.createTable("cartItems", {
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

  await queryInterface.addConstraint("cartItems", {
    fields: ["cartId"],
    type: "FOREIGN KEY",
    name: "fk_cart_id",
    references: {
      table: "carts",
      field: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
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

  await queryInterface.dropTable("cartItems");
  await queryInterface.dropTable("carts");
}

module.exports = { up, down };
