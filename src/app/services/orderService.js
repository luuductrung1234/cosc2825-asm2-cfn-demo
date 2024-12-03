const NotFoundError = require("../../app/errors/NotFoundError");
const BadRequestError = require("../../app/errors/BadRequestError");
const { sum } = require("../../utils/utils");

const productRepository = require("../../infra/repositories/fileProductRepository");
const orderRepository = require("../../infra/repositories/fileOrderRepository");
const models = require("../models");

const listOrders = async (query) => {
  const orders = await Promise.all(
    (
      await orderRepository.listOrders(query)
    ).map(async (order) => {
      const totalAmount = sum(
        order.orderItems.map((item) => item.price * item.quantity)
      );
      return {
        id: order.id,
        orderNumber: getOrderNumber(order),
        customer: {
          fullName: order.customerName,
        },
        totalAmount: totalAmount,
        status: order.status,
        shippingAddress: order.shippingAddress,
        createdAt: order.createdAt,
      };
    })
  );
  return orders;
};

const findById = async (id) => {
  const order = await orderRepository.findById(id);
  const orderItems = [];
  for (const item of order.orderItems) {
    const product = await productRepository.findById(item.productId);
    orderItems.push({
      ...item,
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
    });
  }
  const totalAmount = sum(orderItems.map((item) => item.price * item.quantity));
  return {
    id: order.id,
    orderNumber: getOrderNumber(order),
    customer: {
      id: order.customerId,
      fullName: order.customerName,
      phone: order.customerPhone,
      email: order.customerEmail,
    },
    totalAmount: totalAmount,
    status: order.status,
    shippingAddress: order.shippingAddress,
    orderItems: orderItems,
    createdAt: order.createdAt,
    createdBy: order.createdBy,
    updatedAt: order.updatedAt,
    updatedBy: order.updatedBy,
  };
};

const addOrder = async (createOrderDto, createdBy) => {
  let orderItems = [];
  for (const item of createOrderDto.orderItems) {
    const product = await productRepository.findById(item.productId);
    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price:
        product.discountPrice !== undefined && product.discountPrice !== null
          ? product.discountPrice
          : product.price,
    });
  }

  const order = await orderRepository.saveOrder(
    new models.Order(
      null,
      createOrderDto.customerId,
      createOrderDto.customerName,
      createOrderDto.customerEmail,
      createOrderDto.customerPhone,
      createOrderDto.shippingAddress,
      orderItems,
      models.OrderStatus.New,
      createdBy
    )
  );

  return order;
};

const completeOrder = async (id, completedBy) => {
  const orderInDb = await orderRepository.findById(id);
  if (!orderInDb) throw new NotFoundError(`Not found order with id ${id}`);
  if (orderInDb.status !== models.OrderStatus.New)
    throw new BadRequestError(`Order ${id} is not allowed to complete.`);
  orderInDb.complete(completedBy);
  return await orderRepository.saveOrder(orderInDb);
};

const cancelOrder = async (id, cancelledBy) => {
  const orderInDb = await orderRepository.findById(id);
  if (!orderInDb) throw new NotFoundError(`Not found order with id ${id}`);
  if (orderInDb.status !== models.OrderStatus.New)
    throw new BadRequestError(`Order ${id} is not allowed to cancel.`);
  orderInDb.cancel(cancelledBy);
  return await orderRepository.saveOrder(orderInDb);
};

function getOrderNumber(order) {
  return `ODR-${order.createdAt.getFullYear()}${
    order.createdAt.getMonth() + 1
  }${order.createdAt.getDate()}${("0000" + order.id).slice(-4)}`;
}

module.exports = {
  listOrders,
  findById,
  addOrder,
  completeOrder,
  cancelOrder,
};
