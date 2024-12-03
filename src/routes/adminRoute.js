const express = require("express");

const { claimContains } = require("../middlewares/claimMiddleware");
const adminController = require("../app/controllers/adminController");

const adminRoutes = express.Router();

// GET /admin/products
adminRoutes.get(
  "/products",
  claimContains("groups", "admin"),
  adminController.getListProduct
);
// GET /admin/edit-product/:id
adminRoutes.get(
  "/edit-product/:id",
  claimContains("groups", "admin"),
  adminController.getEditProduct
);
// POST /admin/edit-product/:id
adminRoutes.post(
  "/edit-product/:id",
  claimContains("groups", "admin"),
  adminController.putEditProduct
);
// GET /admin/add-product
adminRoutes.get(
  "/add-product",
  claimContains("groups", "admin"),
  adminController.getAddProduct
);
// POST /admin/add-product
adminRoutes.post(
  "/add-product",
  claimContains("groups", "admin"),
  adminController.postAddProduct
);
// POST /admin/delete-product/:id
adminRoutes.post(
  "/delete-product/:id",
  claimContains("groups", "admin"),
  adminController.deleteDeleteProduct
);

// GET /admin/orders
adminRoutes.get(
  "/orders",
  claimContains("groups", "admin"),
  adminController.getListOrder
);
// GET /orders/:id
adminRoutes.get(
  "/orders/:id",
  claimContains("groups", "admin"),
  adminController.getOrderDetail
);
// POST /complete-order/:id
adminRoutes.post(
  "/complete-order/:id",
  claimContains("groups", "admin"),
  adminController.completeOrder
);

module.exports = adminRoutes;
