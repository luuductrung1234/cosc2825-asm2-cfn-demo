const fs = require("node:fs/promises");
const path = require("node:path");

const models = require("../../app/models");
const rootDir = require("../../utils/path");

const filePath = path.join(rootDir, "infra", "data", "carts.json");

/**
 * @param cart
 * @returns
 * @type {(cart: import("../../app/models").Cart) => Promise<void>}
 */
const saveCart = async (cart) => {
  try {
    const carts = await loadCarts();
    const cartInFile = carts.find((c) => c.customerId === cart.customerId);
    if (!cartInFile) carts.push(cart);
    else cartInFile.cartItems = cart.cartItems;

    await fs.writeFile(filePath, JSON.stringify(carts));
  } catch (ex) {
    console.error("Fail to write data to file.", ex);
  }
};

/**
 * @param customerId
 * @returns
 * @type {(customerId: string) => Promise<import("../../app/models").Cart>}
 */
const loadCart = async (customerId) => {
  let cart = new models.Cart(customerId, []);
  const carts = await loadCarts();
  cart = carts.find((c) => c.customerId === customerId) ?? cart;
  return cart;
};

const loadCarts = async () => {
  let carts = [];
  try {
    const content = await fs.readFile(filePath, { encoding: "utf8" });
    if (content && content !== "") carts = models.Cart.fromString(content);
    return carts;
  } catch (ex) {
    console.error("Fail to read data from file.", ex);
  }
  return carts;
};

module.exports = {
  saveCart,
  loadCart,
};
