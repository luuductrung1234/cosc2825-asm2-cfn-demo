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

  await queryInterface.createTable("orders", {
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

  await queryInterface.createTable("orderItems", {
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
  });

  await queryInterface.addConstraint("orderItems", {
    fields: ["orderId"],
    type: "FOREIGN KEY",
    name: "fk_order_id",
    references: {
      table: "orders",
      field: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  await queryInterface.addConstraint("orderItems", {
    fields: ["productId"],
    type: "FOREIGN KEY",
    name: "fk_order_item_product_id",
    references: {
      table: "products",
      field: "id",
    },
    onDelete: "RESTRICT",
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
}

module.exports = { up, down };
