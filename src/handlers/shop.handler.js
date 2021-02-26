const shopServices = require('../services/shop.service');

// const healthShopHandler = async (req, res) => {
//   res.status(200).send('Shop server is up now!');
// };

const getDataByCategoryHandler = async (req, res) => {
  const categoryName = req.params.name;
  // console.log(categoryName);
  const gotFeatures = await shopServices.getFeatures(categoryName);
  // console.log(gotFeatures);
  const checkValue = {
    features: {
      colour: [],
      size: [],
      brand: [],
    },
  };
  if (gotFeatures.features.colour.length === checkValue.features.colour.length) {
    // console.log('here');
    return res.status(400).send('Failed to get features');
  }
  res.status(200).send(gotFeatures);
};

const fetchDataHandler = async (req, res) => {
  const { body } = req;
  const categoryArray = body.names;
  const result = await shopServices.fetchandStoreData(categoryArray);
  if (result === null) {
    return res.status(400).send('Data already exists or invalid request');
  }
  return res.status(200).send('Sucessfuly stored');
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
