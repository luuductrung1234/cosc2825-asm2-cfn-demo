const productRepository = require("../../infra/repositories/fileProductRepository");

const listProducts = async (query) => {
  const { products, totalCount } = await productRepository.listProducts({
    isDeleted: false,
    ...query,
  });
  return {
    products,
    totalCount,
  };
};

const findById = async (id) => {
  const product = await productRepository.findById(id);
  return product;
};

module.exports = {
  listProducts,
  findById,
};
