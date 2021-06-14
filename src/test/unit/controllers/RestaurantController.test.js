import httpMocks from 'node-mocks-http';
import RestaurantController from '../../../controllers/restaurant';
import RestaurantService from '../../../app/services/restaurants';
describe('controller:  Restaurant', () => {
    test('functions exists or not in restaurant controller', async () => {
        const methods = Object.keys(RestaurantController);
        // eslint-disable-next-line no-undef
        expect(methods).toContain('syncRestaurantAndBranches');
    });
    test('it should return 200 in successfully syncing restaurant and branch data in mongo', async () => {
        // mock response
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        // mock function (spy)

        const syncBranchDataSpy = jest.spyOn(RestaurantService, 'syncRestaurantAndBranchDataInMongo');
        syncBranchDataSpy.mockReturnValue(true);
        // Act
        await RestaurantController.syncRestaurantAndBranches(request, response);
        const data = response._getJSONData();
        // Assert
        expect(response.statusCode).toBe(200);
        expect(data.message).toBe('success!');
        // Restore function to it's original function
        syncBranchDataSpy.mockRestore();
    });
    test('it should return 400 status when code crash', async () => {
        // mock response
        const response = httpMocks.createResponse();
        const request = httpMocks.createRequest();
        // mock function (spy)

        const syncBranchDataSpy = jest.spyOn(RestaurantService, 'syncRestaurantAndBranchDataInMongo');
        syncBranchDataSpy.mockImplementation(() => {
            throw new Error('Unable to sync Data');
        });
        // Act
        await RestaurantController.syncRestaurantAndBranches(request, response);
        const data = response._getJSONData();
        // Assert
        // expect(response.statusCode).toBe(400);
        expect(data.message).toBe('Unable to sync Data');
        // Restore function to it's original function
        syncBranchDataSpy.mockRestore();
    });
});
