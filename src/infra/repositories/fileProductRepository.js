const fs = require("node:fs/promises");
const path = require("node:path");

const model = require("../../app/models");
const rootDir = require("../../utils/path");

const filePath = path.join(rootDir, "infra", "data", "products.json");

/**
 * @param query
 * @returns
 * @type {(query: {
 * 	isDeleted: boolean | undefined,
 * 	recommended: boolean | undefined,
 * 	featured: boolean | undefined,
 * 	isDiscount: boolean | undefined,
 * 	searchText: string | undefined,
 * 	pageIndex: number | undefined,
 * 	pageSize: number | undefined,
 * 	sortBy: string | undefined,
 * 	sortDirection: string | undefined})
 * 	=> Promise<{
 *		products: import("../../app/models").Product[],
 *		totalCount: number
 * 	}>}
 */
const listProducts = async (query) => {
  try {
    let products = await loadProducts();

    if (query.searchText !== undefined && query.searchText !== null) {
      products = products.filter((p) =>
        p.title.toLowerCase().includes(query.searchText.toLowerCase())
      );
    }
    if (query.recommended !== undefined && query.recommended !== null) {
      products = products.filter((p) => p.recommended);
    }
    if (query.featured !== undefined && query.featured !== null) {
      products = products.filter((p) =>
        p.attributes.some((a) => a.name === "featured")
      );
    }
    if (query.isDiscount !== undefined) {
      products = products.filter((p) => p.discountPrice !== null);
    }

    let startIndex = (query.pageIndex || 0) * (query.pageSize || 8);
    let endIndex = startIndex + (query.pageSize || 8);
    let items = products.slice(startIndex, endIndex);

    return {
      products: items,
      totalCount: products.length,
    };
  } catch (err) {
    return { products: [], totalCount: 0 };
  }
};

/**
 * @param id
 * @returns
 * @type {(id: number) => Promise<import("../../app/models").Product>}
 */
const findById = async (id) => {
  return (await loadProducts()).find((p) => p.id === id);
};

const saveProduct = async (product) => {
  let productsInDb = await loadProducts();
  if (product.id !== undefined && product.id !== null) {
    let index = productsInDb.findIndex((p) => p.id === product.id);
    productsInDb.splice(index, 1);
  } else {
    if (productsInDb.length === 0) product.id = 1;
    else {
      let nextId = Math.max(...productsInDb.map((p) => p.id)) + 1;
      product.id = nextId;
    }
  }
  productsInDb.push(product);
  await fs.writeFile(filePath, JSON.stringify(productsInDb), {
    encoding: "utf8",
  });
  return product;
};

/**
 * @type {() => Promise<import("../../app/models").Product[]>}
 */
const loadProducts = async () => {
  const content = await fs.readFile(filePath, { encoding: "utf8" });
  return model.Product.fromString(content);
};

module.exports = {
  listProducts,
  findById,
  saveProduct,
};
