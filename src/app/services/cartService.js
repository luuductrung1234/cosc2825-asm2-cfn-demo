const productService = require("./productService");
const {
  loadCart,
  saveCart,
} = require("../../infra/repositories/fileCartRepository");

const getCart = async (customerId) => {
  const cart = await loadCart(customerId);
  for (const item of cart.cartItems) {
    const product = await productService.findById(item.productId);
    item["productTitle"] = product.title;
    item["productPrice"] = product.price;
    item["productDiscountPrice"] = product.discountPrice;
    item["productImageUrl"] = product.imageUrl;
  }
  return cart;
};

const clearCart = async (customerId) => {
  const cart = await loadCart(customerId);
  cart.clearItems();
  saveCart(cart);
};

const addItems = async (customerId, productId, quantity) => {
  const cart = await loadCart(customerId);
  cart.addItems(productId, quantity);
  saveCart(cart);
};

const removeItems = async (customerId, productId, quantity) => {
  const cart = await loadCart(customerId);
  cart.removeItems(productId, quantity);
  saveCart(cart);
};

module.exports = {
  getCart,
  clearCart,
  addItems,
  removeItems,
};
