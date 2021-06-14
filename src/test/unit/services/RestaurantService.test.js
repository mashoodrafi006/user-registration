import RestaurantService from '../../../app/services/restaurants';
import RestaurantRepository from '../../../app/repositories/restaurants';
import BranchRepo from '../../../app/repositories/branches';
import BranchDriverRespository from '../../../app/repositories/branchDrivers';
import { restaurantWithBranchDataMock } from '../../fixtures/Restaurant';

describe('Service:  Restaurant', () => {
    test('functions exists or not in restaurant service', async () => {
        const methods = Object.keys(RestaurantService);
        // eslint-disable-next-line no-undef
        expect(methods).toContain('syncRestaurantAndBranchDataInMongo');
    });
    test('function should return true after update branch and restaurant data', async () => {
        // mock data
        const restaurantMockData = restaurantWithBranchDataMock();

        const restaurantCountSpy = jest.spyOn(RestaurantRepository, 'getRestaurantCount');
        restaurantCountSpy.mockReturnValue(10);
        const restaurantDatailSpy = jest.spyOn(RestaurantRepository, 'getRestaurantData');
        restaurantDatailSpy.mockReturnValue(restaurantMockData);
        const createOrUpdateBranchSpy = jest.spyOn(BranchRepo, 'createOrUpdateBranch');
        createOrUpdateBranchSpy.mockReturnValue(true);
        const createOrUpdateDriverSpy = jest.spyOn(BranchDriverRespository, 'createOrUpdateDriver');
        createOrUpdateDriverSpy.mockReturnValue(true);
        const response = await RestaurantService.syncRestaurantAndBranchDataInMongo();
        expect(response).toBe(true);
        expect(restaurantCountSpy).toHaveBeenCalledTimes(1);
        expect(restaurantDatailSpy).toHaveBeenCalledTimes(1);
        expect(createOrUpdateBranchSpy).toHaveBeenCalledTimes(2);

        createOrUpdateBranchSpy.mockRestore();
        restaurantDatailSpy.mockRestore();
        restaurantCountSpy.mockRestore();
        createOrUpdateDriverSpy.mockRestore();
    });

    test('function should throw error when code crash', async () => {
        // mock data
        const restaurantMockData = restaurantWithBranchDataMock();

        const restaurantCountSpy = jest.spyOn(RestaurantRepository, 'getRestaurantCount');
        restaurantCountSpy.mockImplementation(() => {
            throw new Error('Unable to get order count');
        });
        const restaurantDatailSpy = jest.spyOn(RestaurantRepository, 'getRestaurantData');
        restaurantDatailSpy.mockReturnValue(restaurantMockData);
        const createRestaurantSpy = jest.spyOn(RestaurantRepository, 'createOrUpdateRestaurant');
        createRestaurantSpy.mockReturnValue(true);
        const createOrUpdateBranchSpy = jest.spyOn(BranchRepo, 'createOrUpdateBranch');
        createOrUpdateBranchSpy.mockReturnValue(true);

        await expect(RestaurantService.syncRestaurantAndBranchDataInMongo()).rejects.toThrow(Error);

        createOrUpdateBranchSpy.mockRestore();
        createRestaurantSpy.mockRestore();
        restaurantDatailSpy.mockRestore();
        restaurantCountSpy.mockRestore();
    });
});
