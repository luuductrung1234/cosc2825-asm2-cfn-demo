const OrderStatus = require("./orderStatus");

class Order {
  /**
   * @param {string} customerId
   * @param {string} customerName
   * @param {string} customerEmail
   * @param {string} customerPhone
   * @param {string} shippingAddress
   * @param {OrderStatus} status
   * @param {string} createdBy
   * @param {Date} createdAt
   * @param {string} updatedBy
   * @param {Date} updatedAt
   */
  constructor(
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    status,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt
  ) {
    this.id = null;
    this.customerId = customerId;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.shippingAddress = shippingAddress;
    this.status = status || OrderStatus.New;
    this.createdAt = createdAt || null;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt || null;
    this.updatedBy = updatedBy || null;
  }

  static getAttributes = () => Object.keys(new Order());

  /**
   * @param value
   * @returns
   * @type {(value: string | undefined)
   * 	=> Order[]>}
   */
  static fromString = (value) => {
    return JSON.parse(value).map(
      (o) =>
        new Order(
          o.customerId,
          o.customerName,
          o.customerEmail,
          o.customerPhone,
          o.shippingAddress,
          o.status,
          o.createdBy,
          o.createdAt !== undefined && o.createdAt !== null
            ? new Date(o.createdAt)
            : o.createdAt,
          o.updatedBy,
          o.updatedAt !== undefined && o.updatedAt !== null
            ? new Date(o.updatedAt)
            : o.updatedAt
        )
    );
  };
}

module.exports = Order;
