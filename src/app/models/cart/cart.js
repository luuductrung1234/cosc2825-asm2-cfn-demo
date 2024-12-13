class Cart {
  /**
   * @param {string} customerId
   */
  constructor(customerId) {
    this.id = null;
    this.customerId = customerId;
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
