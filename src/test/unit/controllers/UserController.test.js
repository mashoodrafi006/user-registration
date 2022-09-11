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

const deleteTestUser = async (userId) => {
    await axios.delete(`http://localhost:5090/api/user/${userId}`);
}

describe('Test cases for user registration.', () => {
    //Add given when then.
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

        deleteTestUser(registeredUser.body.id);
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000)
        });
    })

    test("Register user successfully.", async () => {
        const registeredUser = await getSuccessfullyRegisteredUser();
        const retryRegistration = await getSuccessfullyRegisteredUser();

        expect(retryRegistration.status).toBe(400);
        expect(retryRegistration.message[0]).toBe("Try other username or email.");

        deleteTestUser(registeredUser.body.id);
    })

    test("Do not register user with invalid email", async () => {
        const unregisteredUserWithInvalidEmail = await getUserResponseWithInvalidEmail();

        expect(unregisteredUserWithInvalidEmail.status).toBe(400);
        expect(unregisteredUserWithInvalidEmail.message[0]).toBe("Invalid email address.");
    })

    test("Do not register user with invalid password", async () => {
        const unregisteredUserWithInvalidPassword = await getUserResponseWithInvalidPassword();

        expect(unregisteredUserWithInvalidPassword.status).toBe(400);
        expect(unregisteredUserWithInvalidPassword.message[0]).toBe("Password should contain uppercase letter.");
        expect(unregisteredUserWithInvalidPassword.message[1]).toBe("Password should contain atleast a digit in it.");
        expect(unregisteredUserWithInvalidPassword.message[2]).toBe("Password length should be greater than 8.");
    })
});

describe("Test cases for adding payment details.", () => {
    test("Add payment card details.", async () => {

    });
});