import httpMocks from 'node-mocks-http';
import userFixture from '../../fixtures/user';
import userService from '../../../app/services/userService';
import userController from '../../../controllers/userController';

describe('User controller', () => {
    const functions = Object.keys(userController);

    test('It should contain all functions.', async () => {
        expect(functions).toContain('register');
        expect(functions).toContain('login');
        expect(functions).toContain('saveUserApartment');
        expect(functions).toContain('markApartmentFavorite');
        expect(functions).toContain('findUserFavoriteApartments');
        expect(functions).toContain('prepareResponseBack');
    });

    test('It should return status code 200 on sucessfult login', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/login',
            body: {
                userName: 'Mashood Rafi',
                password: '123123',
            },
        });

        const getLoggedInUser = jest.spyOn(userService, 'loginUser');
        const mockLoggedInUser = userFixture.returnLoggedInUser();
        getLoggedInUser.mockReturnValue(mockLoggedInUser);

        const result = await userController.login(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(200);
        expect(result.statusCode).toBe(200);
        getLoggedInUser.mockRestore();
    });

    test('It should return status code 500 internal server error', async () => {
        const res = httpMocks.createResponse();
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/login',
            body: {
                userName: 'Mashood Rafi',
                password: '123123',
            },
        });

        const getLoggedInUser = jest.spyOn(userService, 'loginUser');

        getLoggedInUser.mockImplementation(() => {
            throw new Error('Unable to fetch Point Of Sale details');
        });

        const result = await userController.login(req, res);
        const data = res._getJSONData();
        expect(data.status).toBe(500);
        expect(result.statusCode).toBe(200);
        getLoggedInUser.mockRestore();
    });
});
