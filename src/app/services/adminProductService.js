const NotFoundError = require("../../app/errors/NotFoundError");
const productRepository = require("../../infra/repositories/sequelizeProductRepository");
const models = require("../models");

const listProducts = async (query) => {
  const { products, totalCount } = await productRepository.listProducts(query);
  return {
    products,
    totalCount,
  };
};

const findById = async (id) => {
  const product = await productRepository.findById(id);
  return product;
};

/**
 * @param {import("../dto").CreateProductDto} createProductDto
 */
const addProduct = async (createProductDto) => {
  let discountPrice = null;
  if (
    !isNaN(createProductDto.discountPrice) &&
    createProductDto.discountPrice !== undefined &&
    createProductDto.discountPrice !== null &&
    createProductDto.discountPrice !== ""
  ) {
    discountPrice = parseFloat(createProductDto.discountPrice);
  }

  const product = await productRepository.saveProduct(
    new models.Product(
      null,
      createProductDto.title,
      createProductDto.imageUrl,
      createProductDto.description,
      createProductDto.price,
      createProductDto.category,
      createProductDto.recommended === "on",
      discountPrice,
      createProductDto.createdBy
    )
  );

  for (const attribute of createProductDto.attributeValues) {
    await productRepository.addAttribute(
      new models.Attribute(
        product.id,
        attribute.name,
        attribute.displayName,
        attribute.value
      )
    );
  }

  return findById(product.id);
};

/**
 * @param {import("../dto").UpdateProductDto} createProductDto
 * @param {number} id
 */
const editProduct = async (id, updateProductDto) => {
  const productInDb = await productRepository.findById(id);
  if (!productInDb) throw new NotFoundError(`Not found product with id ${id}`);

  productInDb.title = updateProductDto.title;
  productInDb.category = updateProductDto.category;
  productInDb.imageUrl = updateProductDto.imageUrl;
  productInDb.description = updateProductDto.description;
  productInDb.price = updateProductDto.price;

  if (
    !isNaN(updateProductDto.discountPrice) &&
    updateProductDto.discountPrice !== undefined &&
    updateProductDto.discountPrice !== null &&
    updateProductDto.discountPrice !== ""
  ) {
    productInDb.discountPrice = parseFloat(updateProductDto.discountPrice);
  }

  productInDb.recommended = updateProductDto.recommended === "on";
  productInDb.updatedBy = updateProductDto.updatedBy;
  productInDb.updatedAt = new Date();
  const savedProduct = await productRepository.saveProduct(productInDb);

  for (const attribute of updateProductDto.attributeValues) {
    const attributeInDb = productInDb.attributes.find(
      (a) => a.name === attribute.name
    );

    if (attributeInDb) {
      attributeInDb.displayName = attribute.displayName;
      attributeInDb.value = attribute.value;
      await productRepository.saveAttribute(attributeInDb);
    } else {
      await productRepository.addAttribute(
        new models.Attribute(
          savedProduct.id,
          attribute.name,
          attribute.displayName,
          attribute.value
        )
      );
    }
  }

  return findById(savedProduct.id);
};

/**
 * @param {number} id
 * @param {string} deletedBy
 */
const deleteProduct = async (id, deletedBy) => {
  const productInDb = await productRepository.findById(id);
  if (!productInDb) throw new NotFoundError(`Not found product with id ${id}`);
  productInDb.isDeleted = true;
  productInDb.updatedBy = deletedBy;
  productInDb.updatedAt = new Date();
  return await productRepository.saveProduct(productInDb);
};

module.exports = {
  listProducts,
  findById,
  addProduct,
  editProduct,
  deleteProduct,
};
