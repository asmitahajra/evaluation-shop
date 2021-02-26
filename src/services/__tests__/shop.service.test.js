const { default: axios } = require('axios');
const shopServices = require('../shop.service');
const { Item } = require('../../models');

describe('fetch and store service', () => {
  const mockArray = ['shoe'];
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockValue = {
    data: {
      name: 'shoes',
      description: 'radiant shoes',
      itemMetadata: [
        {
          id: 'shoe_1',
          name: 'nike air',
          description: 'jordan made these famous!',
        },
      ],
    },
  };

  const mockFeatureValue = {
    data: {
      imageUrl: 'random image',
      features: [
        {
          name: 'Color',
          value: 'Red',
        },
        {
          name: 'Size',
          value: 7,
        },
        {
          name: 'Brand',
          value: 'Nike',
        },
      ],
    },
  };

  const mockPresent = [];
  const mockCreated = {
    dataValues: {
      id: 19,
      category: 'shoe',
      item_id: 'shoe_1',
      colour: 'Red',
      size: '7',
      brand: 'Nike',
    },
    _previousDataValues: {
      category: 'shoe',
      item_id: 'shoe_7',
      colour: 'Green',
      size: '14',
      brand: 'Nike',
      id: 19,
      name: null,
    },
  };

  it('should fetch the data by category if not present and return 1 if succesful', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockValue);
    jest.spyOn(axios, 'get').mockResolvedValue(mockFeatureValue);
    jest.spyOn(Item, 'findAll').mockResolvedValue(mockPresent);
    jest.spyOn(Item, 'create').mockResolvedValue(mockCreated);
    const result = await shopServices.fetchandStoreData(mockArray);
    expect(result).toEqual(mockCreated);
  });
});

describe('getFeatures of a category service', () => {
  const mockCategory = 'phone';
  const mockValue = [
    {
      dataValues: {
        id: 4,
        category: 'phone',
        item_id: 'phone_4',
        name: null,
        colour: 'Black',
        size: '5 inches',
        brand: 'OnePlus',
      },
      _previousDataValues: {
        id: 4,
        category: 'phone',
        item_id: 'phone_4',
        name: null,
        colour: 'Black',
        size: '5 inches',
        brand: 'OnePlus',
      },
      isNewRecord: false,
    },
  ];

  const expectedValue = {
    features: {
      colour: [
        'Black',
      ],
      size: [
        '5 inches',
      ],
      brand: [
        'OnePlus',
      ],
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all unique features of a category', async () => {
    jest.spyOn(Item, 'findAll').mockResolvedValue(mockValue); // const result = await toDoServices.getToDos(mockDb);
    const result = await shopServices.getFeatures(mockCategory);
    expect(result).toEqual(expectedValue);
  });
});

describe('get Items by Feature service', () => {
  const mockBody = {
    category: 'phone',
    features: ['Pink', '5.5 inches', 'Apple'],
  };

  const mockResponse = [{
    dataValues: {
      id: 1,
      category: 'phone',
      item_id: 'phone_1',
      name: null,
      colour: 'Pink',
      size: '5.5 inches',
      brand: 'Apple',
    },
    _previousDataValues: {
      id: 1,
      category: 'phone',
      item_id: 'phone_1',
      name: null,
      colour: 'Pink',
      size: '5.5 inches',
      brand: 'Apple',
    },
  },
  ];

  const expectedValue = [
    'phone_1',
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return a list of objects with that category and feature', async () => {
    jest.spyOn(Item, 'findAll').mockResolvedValue(mockResponse); // const result = await toDoServices.getToDos(mockDb);
    const result = await shopServices.getItemByFeatures(mockBody);
    expect(result).toEqual(expectedValue);
  });
});
