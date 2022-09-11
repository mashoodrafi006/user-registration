import userController from '../../../controllers/userController';
import axios from "axios";

const getSuccessfullyRegisteredUser = async () => {
    const res = await axios.post('http://localhost:5090/api/register', {
        "userName": "mashood-rafi",
        "password": "Rafi@123",
        "email": "mashoodrafi@gmail.com"
    });
    return res.data;
}

const getUserResponseWithInvalidEmail = async () => {
    const res = await axios.post('http://localhost:5090/api/register', {
        "userName": "mashood-rafi",
        "password": "Rafi@123",
        "email": "mashoodrafi@@@@@gmail.com"
    });
    return res.data;
}

const getUserResponseWithInvalidPassword = async () => {
    const res = await axios.post('http://localhost:5090/api/register', {
        "userName": "mashood-rafi",
        "password": "abc",
        "email": "mashoodrafi@gmail.com"
    });
    return res.data;
}

describe('Test cases for user registration & adding card details.', () => {
    //create test user
    //delete test user at the end.
    const functions = Object.keys(userController);

    test('It should contain all functions.', async () => {
        expect(functions).toContain('register');
        expect(functions).toContain('login');
        expect(functions).toContain('addPaymentDetails');
    });

    test("Register user successfully.", async () => {
        const registeredUser = await getSuccessfullyRegisteredUser();

        expect(registeredUser.status).toBe(200);
        expect(registeredUser.message[0]).toBe("Sucess");
    })

    test("Register user successfully.", async () => {
        const registeredUser = await getSuccessfullyRegisteredUser();

        expect(registeredUser.status).toBe(400);
        expect(registeredUser.message[0]).toBe("Try other username or email.");
        // delete user from database here.
    })

    // test("Do not register user with invalid email", async () => {
    //     const unregisteredUserWithInvalidEmail = await getUserResponseWithInvalidEmail();

    //     expect(unregisteredUserWithInvalidEmail.status).toBe(400);
    //     expect(unregisteredUserWithInvalidEmail.message[0]).toBe("Invalid email address.");
    // })

    // test("Do not register user with invalid password", async () => {
    //     const unregisteredUserWithInvalidPassword = await getUserResponseWithInvalidPassword();

    //     expect(unregisteredUserWithInvalidPassword.status).toBe(400);
    //     expect(unregisteredUserWithInvalidPassword.message[0]).toBe("Password should contain uppercase letter.");
    //     expect(unregisteredUserWithInvalidPassword.message[1]).toBe("Password should contain atleast a digit in it.");
    //     expect(unregisteredUserWithInvalidPassword.message[2]).toBe("Password length should be greater than 8.");
    // })

});



// describe('User controller', () => {
//     const functions = Object.keys(userController);

//     test('It should contain all functions.', async () => {
//         expect(functions).toContain('register');
//         expect(functions).toContain('login');
//         expect(functions).toContain('saveUserApartment');
//         expect(functions).toContain('markApartmentFavorite');
//         expect(functions).toContain('findUserFavoriteApartments');
//         expect(functions).toContain('prepareResponseBack');
//     });

    // test('It should return status code 200 on sucessfult login', async () => {
    //     const res = httpMocks.createResponse();
    //     const req = httpMocks.createRequest({
    //         method: 'POST',
    //         url: '/api/login',
    //         body: {
    //             userName: 'Mashood Rafi',
    //             password: '123123',
    //         },
    //     });

    //     const getLoggedInUser = jest.spyOn(userService, 'loginUser');
    //     const mockLoggedInUser = userFixture.returnLoggedInUser();
    //     getLoggedInUser.mockReturnValue(mockLoggedInUser);

    //     const result = await userController.login(req, res);
    //     const data = res._getJSONData();
    //     expect(data.status).toBe(200);
    //     expect(result.statusCode).toBe(200);
    //     getLoggedInUser.mockRestore();
    // });

    // test("Successfully register user.", async () => {
    //     const res = httpMocks.createResponse();
    //     const req = httpMocks.createRequest({
    //         method: 'POST',
    //         url: '/api/register',
    //         body: {
    //             userName: "mashoodrafi006",
    //             password: "Rafi@123",
    //             email: "mashood2@gmail.com"

    //         },
    //     });

    //     const getLoggedInUser = jest.spyOn(userController, 'register');
    //     const mockLoggedInUser = userFixture.returnLoggedInUser();
    //     getLoggedInUser.mockReturnValue(mockLoggedInUser);

    //     const result = await userController.register(req, res);
    //     // const data = res._getJSONData();
    //     console.log( result);

    // });

    // test('It should return status code 500 internal server error', async () => {
    //     const res = httpMocks.createResponse();
    //     const req = httpMocks.createRequest({
    //         method: 'POST',
    //         url: '/api/login',
    //         body: {
    //             userName: 'Mashood Rafi',
    //             password: '123123',
    //         },
    //     });

    //     const getLoggedInUser = jest.spyOn(userService, 'loginUser');

    //     getLoggedInUser.mockImplementation(() => {
    //         throw new Error('Unable to fetch Point Of Sale details');
    //     });

    //     const result = await userController.login(req, res);
    //     const data = res._getJSONData();
    //     expect(data.status).toBe(500);
    //     expect(result.statusCode).toBe(200);
    //     getLoggedInUser.mockRestore();
    // });
// });
