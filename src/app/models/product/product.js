class Product {
  /**
   * @param {number} id
   * @param {string} title
   * @param {string} imageUrl
   * @param {string} description
   * @param {number} price
   * @param {string} category
   * @param {object[]} attributes
   * @param {boolean} recommended
   * @param {number} discountPrice
   * @param {string} createdBy
   * @param {Date} createdAt
   * @param {string} updatedBy
   * @param {Date} updatedAt
   */
  constructor(
    id,
    title,
    imageUrl,
    description,
    price,
    category,
    attributes,
    recommended,
    discountPrice,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.category = category;
    this.attributes = attributes;
    this.recommended = recommended;
    this.discountPrice = discountPrice;
    this.createdAt = createdAt || new Date();
    this.createdBy = createdBy;
    this.updatedAt = updatedAt || null;
    this.updatedBy = updatedBy || null;
    this.isDeleted = false;
  }

  /**
   * @param {string} deletedBy
   * @type {(updatedBy: string) => void}
   */
  delete = (deletedBy) => {
    this.isDeleted = true;
    this.updatedAt = deletedBy;
    this.updatedBy = new Date();
  };

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
          p.id,
          p.title,
          p.imageUrl,
          p.description,
          p.price,
          p.category,
          p.attributes,
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
