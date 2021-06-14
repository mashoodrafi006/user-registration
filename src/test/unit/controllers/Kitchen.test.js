import httpMocks from 'node-mocks-http';
import branchFixture from '../../fixtures/Branch';
import { POSOrders } from '../../fixtures/Order';
import orderService from '../../../app/services/orders';
import branchService from '../../../app/services/branches';
import kitchenController from '../../../controllers/kitchen';

describe('Controller: Kitchen', () => {
    const functions = Object.keys(kitchenController);

    test('It should contain all functions.', async () => {
        expect(functions).toContain('getKitchenDetails');
        expect(functions).toContain('getKitchenStats');
        expect(functions).toContain('getKitchenOrders');
        expect(functions).toContain('getLocationOrders');
        expect(functions).toContain('getDrivers');
        expect(functions).toContain('createAndAssignDriverToJob');
    });

    test('It should return 200 status code.', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/pos/1?type=branch&id=1',
            params: {
                id: 1,
                type: 'branch',
            },
        });
        const fetchBranchDetails = jest.spyOn(branchService, 'fetchBranchDetails');
        const mockPointOfSaleData = branchFixture.branchDetail();
        fetchBranchDetails.mockReturnValue(mockPointOfSaleData);

        const result = await kitchenController.getKitchenDetails(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(200);
        expect(result.statusCode).toBe(200);
        fetchBranchDetails.mockRestore();
    });

    test('It should return 500 internal server error.', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/pos/1?type=branch&id=1',
            params: {
                id: 1,
                type: 'branch',
            },
        });
        const fetchBranchDetails = jest.spyOn(branchService, 'fetchBranchDetails');
        fetchBranchDetails.mockImplementation(() => {
            throw new Error('Unable to fetch Point Of Sale details');
        });

        await kitchenController.getKitchenDetails(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(500);
        fetchBranchDetails.mockRestore();
    });

    test('It should return 200 status code', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/pos/234/drivers?type=branch',
            params: {
                id: 234,
                type: 'branch',
            },
        });
        const getBranchDriver = jest.spyOn(branchService, 'getBranchDrivers');
        const mockDriversData = branchFixture.POSDrivers();
        getBranchDriver.mockReturnValue(mockDriversData);

        const result = await kitchenController.getDrivers(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(200);
        expect(result.statusCode).toBe(200);
        getBranchDriver.mockRestore();
    });

    test('It should return 500 internal server error.', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/pos/0?type=wrongParamter&id=0',
            params: {
                id: 0,
                type: 'wrongParamter',
            },
        });
        const getBranchDriver = jest.spyOn(branchService, 'getBranchDrivers');
        getBranchDriver.mockImplementation(() => {
            throw new Error('Unable to fetch Point Of Sale drivers');
        });
        await kitchenController.getDrivers(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(500);
        getBranchDriver.mockRestore();
    });

    test('It should return Point of Sale stats.', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/pos/234/date/2020-03-26/category/2/orders?type=branch&id=234',
            params: {
                id: 234,
                type: 'branch',
                date: '2020-03-26',
                category: 2,
            },
        });

        const posOrders = POSOrders();
        const fetchPOSOrders = jest.spyOn(orderService, 'getBranchOrders');
        fetchPOSOrders.mockReturnValue(posOrders);

        const result = await kitchenController.getKitchenOrders(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(200);
        expect(result.statusCode).toBe(200);

        fetchPOSOrders.mockRestore();
    });

    test('It should return 500 internal server error while fetching POS orders.', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/pos/234/date/2020-03-26/category/2/orders?type=branch&id=234',
            params: {
                id: 234,
                type: 'branch',
                date: '2020-03-26',
                category: 2,
            },
        });
        const fetchPOSOrders = jest.spyOn(orderService, 'getBranchOrders');
        fetchPOSOrders.mockImplementation(() => {
            throw new Error('Unable to fetch Point Of Sale drivers');
        });
        const result = await kitchenController.getKitchenOrders(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(500);
        expect(result.statusCode).toBe(200);

        fetchPOSOrders.mockRestore();
    });
    test('It should return 200 and drivers array after assign drivers to jobs', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/pos/234/category/2/driver/assign?type=branch',
            params: {
                id: 234,
                type: 'branch',
                category: 2,
            },
            body: [
                {
                    companyId: null,
                    buildingId: 8,
                    driverType: 1,
                    driverId: 2204,
                    driverName: 'Jassaan ',
                    driverPhone: '0230232300',
                },
            ],
        });
        const mockDriversData = branchFixture.POSDrivers();

        const assignDriver = jest.spyOn(branchService, 'createOrAssignDriver');
        assignDriver.mockReturnValue(mockDriversData);
        await kitchenController.createAndAssignDriverToJob(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(200);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(data.body)).toBe(true);
        assignDriver.mockRestore();
    });
    test('It should return 500 when code crash while processing drivers', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/pos/234/category/2/driver/assign?type=branch',
            params: {
                id: 234,
                type: 'branch',
                category: 2,
            },
            body: [
                {
                    companyId: null,
                    buildingId: 8,
                    driverType: 1,
                    driverId: 2204,
                    driverName: 'Jassaan ',
                    driverPhone: '0230232300',
                },
            ],
        });

        const assignDriver = jest.spyOn(branchService, 'createOrAssignDriver');
        assignDriver.mockImplementation(() => {
            throw new Error('Unable to fetch Point Of Sale drivers');
        });
        await kitchenController.createAndAssignDriverToJob(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(500);
        expect(res.statusCode).toBe(200);
        assignDriver.mockRestore();
    });
});
