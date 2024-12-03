const fs = require("node:fs/promises");
const path = require("node:path");

const models = require("../../app/models");
const rootDir = require("../../utils/path");

const filePath = path.join(rootDir, "infra", "data", "orders.json");

/**
 * @param query
 * @returns
 * @type {(query: {customerId: string | undefined,
 * 	sortBy: string | undefined,
 * 	sortDirection: string | undefined})
 * 	=> Promise<import("../../app/models").Order[]>}
 */
const listOrders = async (query) => {
  try {
    let orders = await loadOrders();

    if (query.customerId !== undefined && query.customerId !== null) {
      orders = orders.filter((p) => p.customerId === query.customerId);
    }

    let startIndex = (query.pageIndex || 0) * (query.pageSize || 8);
    let endIndex = startIndex + (query.pageSize || 8);
    let items = orders.slice(startIndex, endIndex);

    return items;
  } catch (err) {
    return [];
  }
};

/**
 * @param id
 * @returns
 * @type {(id: number) => Promise<import("../../app/models").Order>}
 */
const findById = async (id) => {
  return (await loadOrders()).find((p) => p.id === id);
};

/**
 * @param order
 * @returns
 * @type {(order: import("../../app/models").Order) => Promise<void>}
 */
const saveOrder = async (order) => {
  let ordersInDb = await loadOrders();
  if (order.id !== undefined && order.id !== null) {
    let index = ordersInDb.findIndex((p) => p.id === order.id);
    ordersInDb.splice(index, 1);
  } else {
    if (ordersInDb.length === 0) order.id = 1;
    else {
      let nextId = Math.max(...ordersInDb.map((p) => p.id)) + 1;
      order.id = nextId;
    }
  }
  ordersInDb.push(order);
  await fs.writeFile(filePath, JSON.stringify(ordersInDb), {
    encoding: "utf8",
  });
  return order;
};

/**
 * @type {() => Promise<import("../../app/models").Order[]>}
 */
const loadOrders = async () => {
  let orders = [];
  try {
    const content = await fs.readFile(filePath, { encoding: "utf8" });
    if (content && content !== "") orders = models.Order.fromString(content);
    return orders;
  } catch (ex) {
    console.error("Fail to read data from file.", ex);
  }
  return orders;
};

module.exports = {
  listOrders,
  findById,
  saveOrder,
};
