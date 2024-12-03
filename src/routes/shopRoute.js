const express = require("express");

const shopController = require("../app/controllers/shopController");

const shopRoutes = express.Router();

// GET /
shopRoutes.get("/", shopController.getShop);
// GET /products
shopRoutes.get("/products", shopController.getListProduct);
// GET /products/:id
shopRoutes.get("/products/:id", shopController.getProduct);

// GET /cart
shopRoutes.get("/cart", shopController.getCart);
// POST /add-item
shopRoutes.post("/add-item", shopController.postAddItem);
// DELETE /remove-item
shopRoutes.post("/remove-item", shopController.deleteRemoveItem);

// GET /checkout
shopRoutes.get("/checkout", shopController.getCheckout);
// POST /checkout
shopRoutes.post("/checkout", shopController.postCheckout);

// GET /orders
shopRoutes.get("/orders", shopController.getListOrder);
// GET /orders/:id
shopRoutes.get("/orders/:id", shopController.getOrderDetail);
// POST /cancel-orders/:id
shopRoutes.post("/cancel-order/:id", shopController.cancelOrder);

module.exports = shopRoutes;
