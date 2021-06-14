import OrderService from '../../../app/services/orders';
import orderRepository from '../../../app/repositories/orders';
import MealLimitRepo from '../../../app/repositories/MealLimit';
import branchRepository from '../../../app/repositories/branches';
import orderFactory from '../../../app/factories/Orders';
import { getAllOrderServiceFunctionName, getSingleOrderDetail, POSSingleOrders, POSOrders } from '../../fixtures/Order';

describe('Service:  Order', () => {
    test('functions exists or not in order service', async () => {
        const methods = Object.keys(OrderService);
        const functionNames = getAllOrderServiceFunctionName();
        functionNames.forEach((name) => {
            expect(methods).toContain(name);
        });
        // eslint-disable-next-line no-undef
    });

    test('function should return true after update/create order in mongo', async () => {
        // mock data
        const mockOrderData = getSingleOrderDetail();

        const orderDetailSpy = jest.spyOn(orderRepository, 'getOrderDetail');
        orderDetailSpy.mockReturnValue(mockOrderData);
        const createOrUpdateorderSpy = jest.spyOn(orderRepository, 'updateOrderInMongo');
        createOrUpdateorderSpy.mockReturnValue(true);

        const response = await OrderService.updateOrderInfo(123);
        expect(response).toBe(true);
        expect(orderDetailSpy).toHaveBeenCalledTimes(1);
        expect(createOrUpdateorderSpy).toHaveBeenCalledTimes(1);
        expect(createOrUpdateorderSpy).toBeCalledWith(mockOrderData);
        expect(orderDetailSpy).toBeCalledWith(123);
        createOrUpdateorderSpy.mockRestore();
        orderDetailSpy.mockRestore();
    });
    test('function should return true after update/create order in mongo', async () => {
        const orderDetailSpy = jest.spyOn(orderRepository, 'getOrderDetail');
        orderDetailSpy.mockImplementation(() => {
            throw new Error('Unable to get order detail');
        });
        const createOrUpdateorderSpy = jest.spyOn(orderRepository, 'updateOrderInMongo');
        createOrUpdateorderSpy.mockReturnValue(true);

        await expect(OrderService.updateOrderInfo(123)).rejects.toThrow(Error);

        createOrUpdateorderSpy.mockRestore();
        orderDetailSpy.mockRestore();
    });

    test('Function should return expected orders response.', async () => {
        const orders = POSSingleOrders();
        const fetchBranchOrders = jest.spyOn(orderRepository, 'fetchBranchOrders');
        fetchBranchOrders.mockReturnValue(orders);
        const mealLimitResponse = jest.spyOn(MealLimitRepo, 'getBranchLevelMealLimits');
        mealLimitResponse.mockReturnValue([]);
        const branchCapacity = jest.spyOn(branchRepository, 'getBranchMaxCapacity');
        branchCapacity.mockReturnValue(null);
        const response = POSOrders();
        const prepareOrdersResponse = jest.spyOn(orderFactory, 'prepareOrdersResponse');
        prepareOrdersResponse.mockReturnValue(response);

        await OrderService.getBranchOrders(234, '2020-03-26', 2, 1);

        expect(prepareOrdersResponse).toBeCalledWith(orders, [], null);
        expect(fetchBranchOrders).toHaveBeenCalledTimes(1);
        expect(mealLimitResponse).toHaveBeenCalledTimes(1);
        expect(branchCapacity).toHaveBeenCalledTimes(1);

        fetchBranchOrders.mockRestore();
        prepareOrdersResponse.mockRestore();
        mealLimitResponse.mockRestore();
        branchCapacity.mockRestore();
    });

    test('Function should return 500 status code on code crash.', async () => {
        const fetchBranchOrders = jest.spyOn(orderRepository, 'fetchBranchOrders');
        fetchBranchOrders.mockImplementation(() => {
            throw new Error('Unable to get order detail');
        });

        const prepareOrdersResponse = jest.spyOn(orderFactory, 'prepareOrdersResponse');
        prepareOrdersResponse.mockImplementation(() => {
            throw new Error('Unable to get order detail');
        });

        await expect(OrderService.getBranchOrders(234, '2020-03-26', 2, 1)).rejects.toThrow(Error);
        fetchBranchOrders.mockRestore();
        prepareOrdersResponse.mockRestore();
    });
});
