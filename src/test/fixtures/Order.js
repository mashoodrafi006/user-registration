export const getAllOrderServiceFunctionName = () => {
    const names = ['fetchOrdersStats', 'prepareBranchStats', 'updateOrderInfo', 'getLocationOrders', 'getBranchOrders', 'retryFailedOrdersAndUpdateOrderInMongo', 'getOrderCount', 'getBulkOrders'];
    return names;
};
export const getAllOrderRepositoryFunctionName = () => {
    const names = ['getOrderDetail', 'fetchBranchOrders', 'fetchOrdersStats', 'updateOrderInMongo', 'getFailedOrder', 'deleteFailedOrder', 'getOrdersInMongo', 'getOrderCountInMongo'];
    return names;
};
export const getSingleOrderDetail = () => {
    const order = {
        id: 559828,
        trackingId: 'X9q8BQ4Pela',
        pricePerMeal: '31.50',
        quantity: 1,
        scheduleOn: '2020-04-18',
        categoryId: 2,
        status: 3,
        mealId: 4541,
        mealName: 'Small Zcarnivore Pizza',
        mealDescription: 'Oven baked small sized pizza topped with homemade marinara, mozzarella, pepperoni, smoked beef ham, beef sausage, smoked bacon and fresh oregano.',
        mealComesWith: '',
        mealImageUrl: '64061m.jpg',
        companyId: 10983,
        companyName: 'test_tayyab',
        buildingId: 8,
        buildingName: 'Mehroz Test Building',
        branchId: 91,
        branchName: 'ZPizza Barsha1',
        restaurantId: 95,
        restaurantName: 'ZPizzaa',
        userId: 27125,
        hasCutlery: 1,
        apartment: '4',
        floor: '3',
        buildingAddress: 'IMPZZ',
        buildingDropOff: null,
        companyDropOff: 'Test Company,test,1',
        userName: 'Azmaar Jamil',
    };
    return order;
};
export const POSOrders = () => {
    const response = [
        {
            branchId: 234,
            branchName: 'Gallus',
            orders: [
                {
                    orderId: 12125354,
                    quantity: 1,
                    isAccepted: false,
                    isSoldOut: false,
                    isBuildingOrder: false,
                    meal: {
                        id: 55,
                        name: 'Tempura',
                        imageUrl: 'https://cloud.lunchon.ae/resized-images/700px/176021m.jpg',
                        description: 'Spicy',
                        comesWith: 'A lot of fries',
                    },
                    location: {
                        id: 2077,
                        name: 'White Fox',
                    },
                    area: {
                        id: 2,
                        name: 'Dubai Media City',
                    },
                },
            ],
        },
    ];
    return response;
};
export const POSSingleOrders = () => {
    const response = [
        {
            id: 12666,
            trackingId: 'HYgx5s9',
            scheduleOn: '2020-03-26',
            restaurantId: 22,
            restaurantName: 'DFIC',
            status: 4,
            categoryId: 2,
            mealComesWith: 'Samosas',
            mealDescription: 'Potato',
            pricePerMeal: 23.6,
            mealId: 55,
            mealName: 'Samosas',
            mealImageUrl: 'https://cloud.lunchon.ae/resized-images/700px/176021m.jpg',
            buildingId: null,
            buildingName: '',
            companyId: 3269,
            companyName: 'In5',
            userId: 10,
            branchId: 234,
            branchName: 'Bbay',
            quantity: 1,
            areaId: 2,
            areaName: 'Dubai Media City',
            userName: 'Mashood Rafi',
            apartment: ' ',
            hasCutlery: 1,
            floor: '',
            locationAddress: 'Marina road',
        },
    ];
    return response;
};
