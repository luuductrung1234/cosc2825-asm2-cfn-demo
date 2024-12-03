const OrderStatus = require("./orderStatus");

class Order {
  /**
   * @param {number} id
   * @param {string} customerId
   * @param {string} customerName
   * @param {string} customerEmail
   * @param {string} customerPhone
   * @param {string} shippingAddress
   * @param {{productId: string, quantity: number, price: number}[]} orderItems
   * @param {OrderStatus} status
   * @param {string} createdBy
   * @param {Date} createdAt
   * @param {string} updatedBy
   * @param {Date} updatedAt
   */
  constructor(
    id,
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    orderItems,
    status,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt
  ) {
    this.id = id;
    this.customerId = customerId;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.shippingAddress = shippingAddress;
    this.orderItems = orderItems;
    this.status = status || OrderStatus.New;
    this.createdAt = createdAt || new Date();
    this.createdBy = createdBy;
    this.updatedAt = updatedAt || null;
    this.updatedBy = updatedBy || null;
  }

  /**
   * @param {string} cancelledBy
   * @type {(updatedBy: string) => void}
   */
  cancel = (cancelledBy) => {
    this.status = OrderStatus.Cancelled;
    this.updatedAt = new Date();
    this.updatedBy = cancelledBy;
  };

  /**
   * @param {string} completedBy
   * @type {(updatedBy: string) => void}
   */
  complete = (completedBy) => {
    this.status = OrderStatus.Completed;
    this.updatedAt = new Date();
    this.updatedBy = completedBy;
  };

  static getAttributes = () =>
    Object.keys(new Order()).filter(
      (k) => k !== "orderItems" && k !== "getOrderNumber"
    );

  static fromString = (value) => {
    return JSON.parse(value).map(
      (o) =>
        new Order(
          o.id,
          o.customerId,
          o.customerName,
          o.customerEmail,
          o.customerPhone,
          o.shippingAddress,
          o.orderItems.map((item) => ({
            productId: item.productId,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          })),
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
