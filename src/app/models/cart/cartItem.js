class CartItem {
  /**
   * @param {number} cartId
   * @param {number} productId
   * @param {number} quantity
   * @param {Date} createdAt
   * @param {Date} updatedAt
   */
  constructor(cartId, productId, quantity, createdAt, updatedAt) {
    this.id = null;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static getAttributes = () => Object.keys(new CartItem());

  /**
   * @param value
   * @returns
   * @type {(value: string | undefined)
   * 	=> CartItem[]>}
   */
  static fromString = (value) => {
    return JSON.parse(value).map(
      (ci) => new CartItem(ci.cartId, ci.productId, ci.quantity)
    );
  };
}

module.exports = CartItem;
