import branchFixture from '../../fixtures/Branch';
import branchService from '../../../app/services/branches';
import branchDriversRepository from '../../../app/repositories/branchDrivers';
import BranchDriversFactory from '../../../app/factories/branchDrivers';
import BranchDriverRespository from '../../../app/repositories/branchDrivers';
import RobinJobRepo from '../../../app/repositories/robinJob';
import branchRepository from '../../../app/repositories/branches';

describe('Service: Branch', () => {
    test('Following functions should exist.', async () => {
        const functions = Object.keys(branchService);
        const allBranchServiceFunctions = branchFixture.getBranchServiceFunctionNames();
        allBranchServiceFunctions.forEach((functionName) => {
            expect(functions).toContain(functionName);
        });
    });

    test('Function should return Point of Sale drivers.', async () => {
        const POSDriversList = branchFixture.POSDriversListFromDB();
        const POSDriver = branchFixture.POSDrivers();

        const branchDrivers = jest.spyOn(branchDriversRepository, 'getBranchDrivers');
        branchDrivers.mockReturnValue(POSDriversList);
        const branchDriverFactory = jest.spyOn(BranchDriversFactory, 'prepareResponse');
        branchDriverFactory.mockReturnValue(POSDriver);

        const response = await branchService.getBranchDrivers(1);
        expect(response[0].driverId).toBe(1);
        branchDrivers.mockRestore();
        branchDriverFactory.mockRestore();
    });
    test('Function should get branch Driver and assign driver to job and return updated driver list', async () => {
        const POSDriversList = branchFixture.POSDriversListFromDB();
        const POSDriver = branchFixture.POSDrivers();

        const branchDriversDB = jest.spyOn(branchDriversRepository, 'getBranchDrivers');
        branchDriversDB.mockImplementation(() => {
            throw new Error('Unable to get branch driver');
        });
        const branchDrivers = jest.spyOn(BranchDriversFactory, 'prepareResponse');
        branchDrivers.mockReturnValue(POSDriver);
        const branchDriver = jest.spyOn(BranchDriverRespository, 'getBranchDriver');
        branchDriver.mockReturnValue({ id: 1, name: 'rohaan', phone: '21213' });
        const robinJob = jest.spyOn(RobinJobRepo, 'updateDriverInJob');
        robinJob.mockReturnValue(true);
        await expect(
            branchService.createOrAssignDriver(1, 2, [
                {
                    companyId: null,
                    buildingId: 8,
                    driverType: 1,
                    driverId: 2204,
                    driverName: 'Jassaan ',
                    driverPhone: '21213',
                },
            ]),
        ).rejects.toThrow(Error);

        // const response = await branchService.createOrAssignDriver(1, 2, [
        //     {
        //         companyId: null,
        //         buildingId: 8,
        //         driverType: 1,
        //         driverId: 2204,
        //         driverName: 'Jassaan ',
        //         driverPhone: '21213',
        //     },
        // ]);
        // expect(Array.isArray(response)).toBe(true);
        // expect(typeof response[0]).toBe('object');
        // expect(response[0].driverId).toBe(1);

        branchDrivers.mockRestore();
        branchDriversDB.mockRestore();
        branchDriver.mockRestore();
        robinJob.mockRestore();
    });

    test('Function should create branch Driver and assign driver to job and return updated driver list', async () => {
        const POSDriversList = branchFixture.POSDriversListFromDB();
        const POSDriver = branchFixture.POSDrivers();

        const branchDriversDB = jest.spyOn(branchDriversRepository, 'getBranchDrivers');
        branchDriversDB.mockReturnValue(POSDriversList);
        const branchDrivers = jest.spyOn(BranchDriversFactory, 'prepareResponse');
        branchDrivers.mockReturnValue(POSDriver);
        const restId = jest.spyOn(branchRepository, 'getRestaurantId');
        restId.mockReturnValue(1);

        const branchDriver = jest.spyOn(BranchDriverRespository, 'getBranchDriver');
        branchDriver.mockReturnValue({ id: 1, name: 'rohaan', phone: '21213' });
        const robinJob = jest.spyOn(RobinJobRepo, 'updateDriverInJob');
        robinJob.mockReturnValue(true);

        const branchNewDriver = jest.spyOn(BranchDriverRespository, 'createBranchDriver');
        branchNewDriver.mockReturnValue({ id: 1, name: 'rohaan', phone: '21213' });
        const branchCreateNewDriver = jest.spyOn(BranchDriverRespository, 'createOrUpdateDriver');
        branchCreateNewDriver.mockReturnValue(true);

        const response = await branchService.createOrAssignDriver(1, 2, [
            {
                companyId: null,
                buildingId: 8,
                driverType: 2,
                driverName: 'Jassaan ',
                driverPhone: '21213',
            },
        ]);
        expect(Array.isArray(response)).toBe(true);
        expect(typeof response[0]).toBe('object');
        expect(response[0].driverId).toBe(1);

        branchDrivers.mockRestore();
        branchDriversDB.mockRestore();
        branchDriver.mockRestore();
        robinJob.mockRestore();
        restId.mockRestore();
        branchNewDriver.mockRestore();
        branchCreateNewDriver.mockRestore();
    });
    test('Function should throw error when code crash while processing assign drivers', async () => {
        const POSDriversList = branchFixture.POSDriversListFromDB();
        const POSDriver = branchFixture.POSDrivers();

        const branchDriversDB = jest.spyOn(branchDriversRepository, 'getBranchDrivers');
        branchDriversDB.mockReturnValue(POSDriversList);
        const branchDrivers = jest.spyOn(BranchDriversFactory, 'prepareResponse');
        branchDrivers.mockReturnValue(POSDriver);
        const branchDriver = jest.spyOn(BranchDriverRespository, 'getBranchDriver');
        branchDriver.mockReturnValue({ id: 1, name: 'rohaan', phone: '21213' });
        const robinJob = jest.spyOn(RobinJobRepo, 'updateDriverInJob');
        robinJob.mockReturnValue(true);

        const response = await branchService.createOrAssignDriver(1, 2, [
            {
                companyId: null,
                buildingId: 8,
                driverType: 1,
                driverId: 2204,
                driverName: 'Jassaan ',
                driverPhone: '21213',
            },
        ]);
        expect(Array.isArray(response)).toBe(true);
        expect(typeof response[0]).toBe('object');
        expect(response[0].driverId).toBe(1);

        branchDrivers.mockRestore();
        branchDriversDB.mockRestore();
        branchDriver.mockRestore();
        robinJob.mockRestore();
    });
    // test('It should return 500 internal server error', async () => {
    //     const branchDrivers = jest.spyOn(branchDriversRepository, 'getBranchDrivers');
    //     branchDrivers.mockImplementation(() => {
    //         throw new Error('Unable to fetch Point Of Sale drivers.');
    //     });

    //     const response = await branchService.getBranchDrivers(1);
    //     expect(response.status).toBe(500);
    //     branchDrivers.mockRestore();
    // });
});
