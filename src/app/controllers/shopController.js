const controller = require("../../utils/controller");
const dto = require("../dto");
const productService = require("../services/productService");
const cartService = require("../services/cartService");
const orderService = require("../services/orderService");

const getShop = controller.get(async (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "Shop",
    path: "/",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    recommendedProducts: (
      await productService.listProducts({
        recommended: true,
      })
    ).products,
    featuredProducts: (
      await productService.listProducts({
        featured: true,
      })
    ).products,
    discountProducts: (
      await productService.listProducts({
        isDiscount: true,
      })
    ).products,
  });
});

const getListProduct = controller.get(async (req, res, next) => {
  const { products, totalCount } = await productService.listProducts(req.query);
  res.render("shop/product-list", {
    pageTitle: "All Products",
    path: "/products",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    products,
    totalCount,
    previousQuery: req.query,
  });
}, dto.ListProductQuery);

const getProduct = controller.get(async (req, res, next) => {
  res.render("shop/product-detail", {
    pageTitle: "Product",
    path: "/products",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    product: await productService.findById(req.params.id),
  });
}, dto.FindProductParams);

const getListOrder = controller.get(async (req, res, next) => {
  res.render("shop/order-list", {
    pageTitle: "All Orders",
    path: "/orders",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    orders: await orderService.listOrders({
      ...req.query,
      customerId: req.auth.userId,
    }),
  });
}, dto.ListOrderQuery);

const getOrderDetail = controller.get(async (req, res, next) => {
  res.render("shop/order-detail", {
    pageTitle: "Order",
    path: "/orders",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    order: await orderService.findById(req.params.id),
  });
}, dto.FindOrderParams);

const cancelOrder = controller.post(
  async (req, res, next) => {
    await orderService.cancelOrder(req.params.id, req.auth.username);
    res.redirect(req.body.goTo ? req.body.goTo : "/orders");
  },
  dto.FindOrderParams,
  dto.CancelOrderDto
);

const getCart = controller.get(async (req, res, next) => {
  let cart = await cartService.getCart(req.auth.userId);
  let totalQuantity = cart.cartItems
    .map((item) => item.quantity)
    .reduce((partialSum, a) => partialSum + a, 0);
  let totalAmount = cart.cartItems
    .map((item) => {
      if (
        item.productDiscountPrice !== undefined &&
        item.productDiscountPrice !== null
      )
        return item.productDiscountPrice;
      return item.productPrice;
    })
    .reduce((partialSum, a) => partialSum + a, 0);
  res.render("shop/cart", {
    pageTitle: "Shopping Cart",
    path: "/cart",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    cart,
    totalQuantity,
    totalAmount,
  });
});

const postAddItem = controller.post(async (req, res, next) => {
  await cartService.addItems(
    req.auth.userId,
    parseInt(req.body.productId),
    parseInt(req.body.quantity)
  );
  res.redirect(
    req.body.goTo ? req.body.goTo : "/products?pageIndex=0&pageSize=8"
  );
}, dto.AddCartItemDto);

const deleteRemoveItem = controller.post(async (req, res, next) => {
  await cartService.removeItems(
    req.auth.userId,
    req.body.productId ? parseInt(req.body.productId) : req.body.productId,
    req.body.quantity ? parseInt(req.body.quantity) : req.body.quantity
  );
  res.redirect("/cart");
}, dto.RemoveCartItemDto);

const getCheckout = controller.get(async (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/cart",
    isAuth: req.auth.isAuth,
    username: req.auth.username,
    isAdmin: req.auth.groups.includes("admin"),
    cart: await cartService.getCart(req.auth.userId),
  });
});

const postCheckout = controller.post(async (req, res, next) => {
  if (
    req.body.customerId === undefined ||
    req.body.customerId === null ||
    req.body.customerId === ""
  ) {
    req.body.customerId = req.auth.userId;
  }

  await orderService.addOrder(req.body, req.auth.username);
  await cartService.clearCart(req.auth.userId);
  res.redirect("/orders");
}, dto.CreateOrderDto);

module.exports = {
  getShop,
  getListProduct,
  getProduct,
  getCart,
  getCheckout,
  postCheckout,
  postAddItem,
  deleteRemoveItem,
  getListOrder,
  getOrderDetail,
  cancelOrder,
};
