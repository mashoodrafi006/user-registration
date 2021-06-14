import orderController from '../../../controllers/orders';
import OrderService from '../../../app/services/orders';
describe('controller:  Order', () => {
    test('functions exists or not in Order controller', async () => {
        const methods = Object.keys(orderController);
        // eslint-disable-next-line no-undef
        expect(methods).toContain('updateOrderInfo');
        expect(methods).toContain('retryFailedOrders');
    });

    test('it should return true when it get order Id and successfully update in mongo', async () => {
        // mock response
        const mockparams = {
            orderId: {
                Value: 123,
            },
        };
        // mock function (spy)

        const OrderInfoSpy = jest.spyOn(OrderService, 'updateOrderInfo');
        OrderInfoSpy.mockReturnValue(true);
        // Act
        const response = await orderController.updateOrderInfo(mockparams);
        // Assert
        expect(response).toBe(true);
        // Restore function to it's original function
        OrderInfoSpy.mockRestore();
    });
    test('it should throw error when some code crash', async () => {
        // mock response
        const mockparams = {
            orderId: {
                Value: 123,
            },
        };
        // mock function (spy)

        const OrderInfoSpy = jest.spyOn(OrderService, 'updateOrderInfo');
        OrderInfoSpy.mockImplementation(() => {
            throw new Error('Unable to update data');
        });
        // Act
        await expect(orderController.updateOrderInfo(mockparams)).rejects.toThrow(Error);

        // Restore function to it's original function
        OrderInfoSpy.mockRestore();
    });
});
