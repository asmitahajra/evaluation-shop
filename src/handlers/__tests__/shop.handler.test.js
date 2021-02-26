const allShopHandlers = require('../shop.handler');
const shopServices = require('../../services/shop.service');

describe('Fetch and store items handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { body: { names: ['shoe'] } };
  const failedMockRequest = { body: { names: ['shoes'] } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
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
  const checkValue = null;
  // const failedMockValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and return "Sucessfuly stored"', async () => {
    const spyOnShopService = jest.spyOn(shopServices, 'fetchandStoreData');
    spyOnShopService.mockResolvedValue(mockCreated);
    await allShopHandlers.fetchDataHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Sucessfuly stored');
  });

  it('should set response status code to 400 , and return "Data already exists or invalid request" if there exists duplicate or data could not be fetched', async () => {
    const spyOnShopService = jest.spyOn(shopServices, 'fetchandStoreData');
    spyOnShopService.mockResolvedValue(checkValue);
    await allShopHandlers.fetchDataHandler(failedMockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Data already exists or invalid request');
  });
});

describe('Get data by category handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { params: { name: 'shoe' } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = {
    features: {
      colour: [
        'Blue',
        'Black',
        'Red',
        'Cyan with black stripped',
        'Green and yellow',
        'Grey',
        'Green',
      ],
      size: [
        '8',
        '10',
        '11.5',
        '12.5',
        '7',
        '14',
      ],
      brand: [
        'Adidas',
        'spunk',
        'reebok',
        'umbro',
        'sketchers',
        'Nike',
      ],
    },
  };

  const checkValue = {
    features: {
      colour: [],
      size: [],
      brand: [],
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and return list of features for the category', async () => {
    const spyOnShopService = jest.spyOn(shopServices, 'getFeatures');
    // console.log(mockValue.toString());
    spyOnShopService.mockResolvedValue(mockValue);
    await allShopHandlers.getDataByCategoryHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });

  it('should set response status code to 400 , and return "Failed to get features" if invalid request', async () => {
    const spyOnShopService = jest.spyOn(shopServices, 'getFeatures');
    spyOnShopService.mockResolvedValue(checkValue);
    await allShopHandlers.getDataByCategoryHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('Failed to get features');
  });
});

describe('Find by Features handler', () => {
  const mockSend = jest.fn();
  const mockRequest = {
    body: {
      category: 'shoe',
      features: ['Black', '5 inches', 'OnePlus'],
    },
  };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = [
    'phone_4',
  ];

  const checkValue = [];
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200 and return list of items that match the features', async () => {
    const spyOnShopService = jest.spyOn(shopServices, 'getItemByFeatures');
    spyOnShopService.mockResolvedValue(mockValue);
    await allShopHandlers.findByFeaturesHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });

  it('should set response status code to 400 , and return "No such item exists" if invalid request', async () => {
    const spyOnShopService = jest.spyOn(shopServices, 'getItemByFeatures');
    spyOnShopService.mockResolvedValue(checkValue);
    const result = await allShopHandlers.findByFeaturesHandler(mockRequest, mockResponse);
    // console.log(result);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.status().send).toHaveBeenCalledWith('No such item exists');
  });
});
