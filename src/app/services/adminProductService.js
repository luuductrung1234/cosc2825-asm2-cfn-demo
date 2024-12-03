const NotFoundError = require("../../app/errors/NotFoundError");
const productRepository = require("../../infra/repositories/fileProductRepository");
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

const addProduct = async (createProductDto) => {
  let discountPrice = null;
  if (
    !isNaN(createProductDto.discountPrice) &&
    createProductDto.discountPrice !== undefined &&
    createProductDto.discountPrice !== null &&
    createProductDto.discountPrice !== ""
  )
    discountPrice = parseFloat(createProductDto.discountPrice);

  const product = await productRepository.saveProduct(
    new models.Product(
      null,
      createProductDto.title,
      createProductDto.imageUrl,
      createProductDto.description,
      createProductDto.price,
      createProductDto.category,
      createProductDto.attributeValues,
      createProductDto.recommended === "on" ? true : false,
      discountPrice,
      createProductDto.createdBy
    )
  );

  return product;
};

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
  )
    productInDb.discountPrice = parseFloat(updateProductDto.discountPrice);
  productInDb.recommended =
    updateProductDto.recommended === "on" ? true : false;
  productInDb.attributes = updateProductDto.attributeValues;
  productInDb.updatedBy = updateProductDto.updatedBy;
  productInDb.updatedAt = new Date();
  const savedProduct = await productRepository.saveProduct(productInDb);
  return savedProduct;
};

const deleteProduct = async (id, deletedBy) => {
  const productInDb = await productRepository.findById(id);
  if (!productInDb) throw new NotFoundError(`Not found product with id ${id}`);
  productInDb.delete(deletedBy);
  return await productRepository.saveProduct(productInDb);
};

module.exports = {
  listProducts,
  findById,
  addProduct,
  editProduct,
  deleteProduct,
};
