class OrderItem {
  /**
   * @param {number} orderId
   * @param {number} productId
   * @param {number} quantity
   * @param {number} price
   */
  constructor(orderId, productId, quantity, price) {
    this.id = null;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }

  static getAttributes = () => Object.keys(new OrderItem());

  /**
   * @param value
   * @returns
   * @type {(value: string | undefined)
   * 	=> OrderItem[]>}
   */
  static fromString = (value) => {
    return JSON.parse(value).map(
      (oi) => new OrderItem(oi.orderId, oi.productId, oi.quantity, oi.price)
    );
  };
}

module.exports = OrderItem;
