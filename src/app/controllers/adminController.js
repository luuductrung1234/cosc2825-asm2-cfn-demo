const controller = require("../../utils/controller");
const dto = require("../dto");
const productService = require("../services/adminProductService");
const orderService = require("../services/orderService");

const getListProduct = controller.get(async (req, res) => {
  const { products, totalCount } = await productService.listProducts(req.query);
  res.render("admin/product-list", {
    pageTitle: "Admin Products",
    path: "/admin/products",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    products,
    totalCount,
    previousQuery: req.query,
  });
}, dto.ListProductQuery);

const getAddProduct = controller.get(async (req, res) => {
  res.render("admin/product-form", {
    pageTitle: "Add Product",
    path: "/admin/products",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    edit: false,
    product: {},
  });
});

const postAddProduct = controller.post(async (req, res) => {
  const product = await productService.addProduct({
    ...req.body,
    createdBy: req.auth.username,
  });
  res.redirect(`/admin/edit-product/${product.id}`);
}, dto.CreateProductDto);

const getEditProduct = controller.get(async (req, res) => {
  res.render("admin/product-form", {
    pageTitle: "Edit Product",
    path: "/admin/products",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    edit: true,
    product: await productService.findById(req.params.id),
  });
}, dto.FindProductParams);

const putEditProduct = controller.put(
  async (req, res) => {
    await productService.editProduct(req.params.id, {
      ...req.body,
      updatedBy: req.auth.username,
    });
    res.redirect(
      req.query?.goTo ? req.query?.goTo : `/admin/edit-product/${req.params.id}`
    );
  },
  dto.FindProductParams,
  dto.UpdateProductDto
);

const deleteDeleteProduct = controller.delete(async (req, res) => {
  await productService.deleteProduct(req.params.id, req.auth.username);
  res.redirect("/admin/products");
}, dto.DeleteProductParams);

const getListOrder = controller.get(async (req, res, next) => {
  res.render("admin/order-list", {
    pageTitle: "Admin Orders",
    path: "/admin/orders",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    orders: await orderService.listOrders(req.query),
  });
}, dto.ListOrderQuery);

const getOrderDetail = controller.get(async (req, res, next) => {
  res.render("admin/order-detail", {
    pageTitle: "Admin Order",
    path: "/admin/orders",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    order: await orderService.findById(req.params.id),
  });
}, dto.FindOrderParams);

const completeOrder = controller.post(
  async (req, res, next) => {
    await orderService.completeOrder(req.params.id, req.auth.username);
    res.redirect(req.body.goTo ? req.body.goTo : "/admin/orders");
  },
  dto.FindOrderParams,
  dto.CompleteOrderDto
);

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  putEditProduct,
  getListProduct,
  deleteDeleteProduct,
  getListOrder,
  getOrderDetail,
  completeOrder,
};
