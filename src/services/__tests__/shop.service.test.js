const { default: axios } = require('axios');
const shopServices = require('../shop.service');
const { Item } = require('../../models');

xdescribe('fetch and store service', () => {
  const mockArray = ['phone'];
  const mockValue =
  //   const mockId = '-0DZUCVFcb';
  //   const expectedValue = {
  //     data: {
  //       tags: ['famous-quotes'],
  //       _id: '-14YplwiKmh',
  //       content: 'A short saying often contains much wisdom.',
  //       author: 'Sophocles',
  //       length: 42,
  //     },
  //   };
  afterEach(() => {
    jest.clearAllMocks();
  });
  //   const createdValue = {
  //     id: 14,
  //     tags: [
  //       'famous-quotes',
  //     ],
  //     _id: '-14YplwiKmh',
  //     content: 'A short saying often contains much wisdom.',
  //     author: 'Sophocles',
  //     length: 42,
  //     updatedAt: '2021-02-25T17:44:55.269Z',
  //     createdAt: '2021-02-25T17:44:55.269Z',
  //     status: null,
  //   };

  //   const mockValue = [];
  it('should fetch the data by category if not present and return 1 if succesfull', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue(expectedValue);
    jest.spyOn(Quote, 'findAll').mockResolvedValue(mockValue);
    jest.spyOn(Quote, 'create').mockResolvedValue(createdValue);
    const result = await quoteServices.fetchAndStoreQuote(mockId);
    expect(result).toStrictEqual(createdValue);
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
