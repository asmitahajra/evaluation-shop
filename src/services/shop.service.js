/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const { default: axios } = require('axios');
const { Op } = require('sequelize');
const { Item } = require('../models');

const fetchandStoreData = async (categoryArray) => {
  let categoryDetails;
  let categoryDetailsData;
  let itemDetails;
  let itemDetailsDescribe;
  let colour;
  let size;
  let brand;
  let created = 0;

  let categoryName;
  let itemId;
  for (category in categoryArray) {
    categoryName = categoryArray[category];

    categoryDetails = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${categoryName}`);
    console.log(categoryDetails);
    categoryDetailsData = categoryDetails.data.itemMetadata;

    for (item in categoryDetailsData) {
      itemId = categoryDetailsData[item].id;

      itemDetails = await axios.get(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${itemId}`);
      itemDetailsDescribe = itemDetails.data.features;

      for (feature in itemDetailsDescribe) {
        if (itemDetailsDescribe[feature].name === 'Color') {
          colour = itemDetailsDescribe[feature].value;
        }
        if (itemDetailsDescribe[feature].name === 'Size') {
          size = itemDetailsDescribe[feature].value;
        }
        if (itemDetailsDescribe[feature].name === 'Brand') {
          brand = itemDetailsDescribe[feature].value;
        }
      }

      const isPresentItem = await Item.findAll({
        where: {
          item_id: itemId,
        },
      });

      let createdItem = null;
      const toCheck = [];
      if (isPresentItem.toString() === toCheck.toString()) {
        createdItem = await Item.create({
          category: categoryName, item_id: itemId, colour, size, brand,
        });

        created = 1;
      }
    }
  }
  return created;
};

const getFeatures = async (categoryName) => {
  const allColours = [];
  const allSizes = [];
  const allBrands = [];
  const items = await Item.findAll({ where: { category: categoryName } });
  // console.log(items);
  for (item in items) {
    allColours.push(items[item].dataValues.colour);
    allSizes.push(items[item].dataValues.size);
    allBrands.push(items[item].dataValues.brand);
  }

  const uniqueColours = allColours.filter((elem, pos) => allColours.indexOf(elem) == pos);
  const uniqueSizes = allSizes.filter((elem, pos) => allSizes.indexOf(elem) == pos);
  const uniqueBrands = allBrands.filter((elem, pos) => allBrands.indexOf(elem) == pos);
  const featuresObject = {
    features: {
      colour: uniqueColours,
      size: uniqueSizes,
      brand: uniqueBrands,
    },
  };

  return featuresObject;
};

const getItemByFeatures = async (body) => {
  const { category } = body;
  const { features } = body;
  const listOfFoundObjects = [];
  const foundByFeatures = await Item.findAll({ where: { colour: { [Op.in]: features }, size: { [Op.in]: features }, brand: { [Op.in]: features } } });
  console.log(foundByFeatures);
  for (item in foundByFeatures) {
    listOfFoundObjects.push(foundByFeatures[item].dataValues.item_id);
  }
  return listOfFoundObjects;
};

module.exports = { fetchandStoreData, getFeatures, getItemByFeatures };
