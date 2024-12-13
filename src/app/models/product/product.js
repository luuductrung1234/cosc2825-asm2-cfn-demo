class Product {
  /**
   * @param {string} title
   * @param {string} imageUrl
   * @param {string} description
   * @param {number} price
   * @param {string} category
   * @param {boolean} recommended
   * @param {number} discountPrice
   * @param {string} createdBy
   * @param {Date} createdAt
   * @param {string} updatedBy
   * @param {Date} updatedAt
   */
  constructor(
    title,
    imageUrl,
    description,
    price,
    category,
    recommended,
    discountPrice,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt
  ) {
    this.id = null;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.category = category;
    this.recommended = recommended;
    this.discountPrice = discountPrice;
    this.createdAt = createdAt || null;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt || null;
    this.updatedBy = updatedBy || null;
    this.isDeleted = false;
  }

  static getAttributes = () => Object.keys(new Product());

  /**
   * @param value
   * @returns
   * @type {(value: string | undefined)
   * 	=> Product[]>}
   */
  static fromString = (value) => {
    return JSON.parse(value).map(
      (p) =>
        new Product(
          p.title,
          p.imageUrl,
          p.description,
          p.price,
          p.category,
          p.recommended,
          p.discountPrice,
          p.createdBy,
          p.createdAt,
          p.updatedBy,
          p.updatedAt
        )
    );
  };
}

module.exports = Product;
