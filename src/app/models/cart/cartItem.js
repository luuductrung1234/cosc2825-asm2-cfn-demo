class CartItem {
  /**
   * @param {number} cartId
   * @param {number} productId
   * @param {number} quantity
   */
  constructor(cartId, productId, quantity) {
    this.id = null;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
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
