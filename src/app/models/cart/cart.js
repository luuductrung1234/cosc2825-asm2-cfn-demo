class Cart {
  /**
   * @param {string} customerId
   * @param {Date} createdAt
   * @param {Date} updatedAt
   */
  constructor(customerId, createdAt, updatedAt) {
    this.id = null;
    this.customerId = customerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static getAttributes = () => Object.keys(new Cart());

  /**
   * @param value
   * @returns
   * @type {(value: string | undefined)
   * 	=> Cart[]>}
   */
  static fromString = (value) => {
    return JSON.parse(value).map((c) => new Cart(c.customerId));
  };
}

module.exports = Cart;
