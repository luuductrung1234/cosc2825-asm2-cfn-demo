class Attribute {
  /**
   * @param {number} productId
   * @param {string} name
   * @param {string} displayName
   * @param {string} value
   */
  constructor(productId, name, displayName, value) {
    this.id = null;
    this.productId = productId;
    this.name = name;
    this.displayName = displayName;
    this.value = value;
  }

  static getAttributes = () => Object.keys(new Attribute());

  /**
   * @param value
   * @returns
   * @type {(value: string | undefined)
   * 	=> Attribute[]>}
   */
  static fromString = (value) => {
    return JSON.parse(value).map(
      (a) => new Attribute(a.productId, a.name, a.displayName, a.value)
    );
  };
}

module.exports = Attribute;
