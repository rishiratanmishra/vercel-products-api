const fetchProducts = require('../models/product');

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};
  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (featured) {
    queryObject.featured = featured;
  }

  let apiData = fetchProducts.find(queryObject);
  if (sort) {
    let sortFix = sort.replace(',', ' ');
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(',').join(' ');
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;
  let skip = (page - 1) * limit;
  apiData = apiData.skip(skip).limit(limit);
  const productsData = await apiData;
  res.status(200).json({ productsData });
};

const getAllProductsTesting = async (req, res) => {
  const productsData = await fetchProducts.find(req.query);
  res.status(200).json({ productsData, nbHits: productsData.length });
};

module.exports = { getAllProducts, getAllProductsTesting };
