const shopServices = require('../services/shop.service');

// const healthShopHandler = async (req, res) => {
//   res.status(200).send('Shop server is up now!');
// };

const getDataByCategoryHandler = async (req, res) => {
  const categoryName = req.params.name;
  // console.log(categoryName);
  const features = await shopServices.getFeatures(categoryName);
  if (features == null) {
    return res.status(400).json('Failed to get features');
  }
  return res.status(200).send(features);
};

const fetchDataHandler = async (req, res) => {
  const { body } = req;
  const categoryArray = body.names;
  const result = await shopServices.fetchandStoreData(categoryArray);
  if (result === 1) {
    return res.status(200).json('Fetched succesfuly');
  }
  if (result === 0) {
    return res.status(400).json('Data already exists');
  }
};

const findByFeaturesHandler = async (req, res) => {
  const { body } = req;
  const listOfItems = await shopServices.getItemByFeatures(body);
  // console.log(listOfItems);
  const compareWith = [];
  if (listOfItems.toString() === compareWith.toString()) {
    return res.status(400).json('No such item exists');
  }
  res.status(200).send(listOfItems);
};

module.exports = { fetchDataHandler, getDataByCategoryHandler, findByFeaturesHandler };
