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

  await queryInterface.addColumn("carts", "createdAt", {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  });
  await queryInterface.addColumn("carts", "updatedAt", {
    type: Sequelize.DATE,
    allowNull: true,
  });
  await queryInterface.addColumn("cartItems", "createdAt", {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  });
  await queryInterface.addColumn("cartItems", "updatedAt", {
    type: Sequelize.DATE,
    allowNull: true,
  });
  await queryInterface.addColumn("orderItems", "createdAt", {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  });
  await queryInterface.addColumn("orderItems", "updatedAt", {
    type: Sequelize.DATE,
    allowNull: true,
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

  await queryInterface.removeColumn("carts", "createdAt");
  await queryInterface.removeColumn("carts", "updatedAt");
  await queryInterface.removeColumn("cartItems", "createdAt");
  await queryInterface.removeColumn("cartItems", "updatedAt");
  await queryInterface.removeColumn("orderItems", "createdAt");
  await queryInterface.removeColumn("orderItems", "updatedAt");
}

module.exports = { up, down };
