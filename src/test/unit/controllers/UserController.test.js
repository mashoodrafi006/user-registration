import userController from '../../../controllers/userController';
import axios from "axios";
import UserFixture from '../../fixtures/user';
import ErrorMessages from "../../../constants/errorMessage";
import { API_STATUS_CODES, RESPONSE_MESSAGES } from "../../../constants/constants";


let accessToken;
let testUserId;
ErrorMessages.setErrorMessages();
let errorMessages = ErrorMessages.getErrorMessages();

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

const addPaymentCard = async (accessToken, cardType, name, cardNumber, expiryDate) => {
    const res = await axios.patch('http://localhost:5090/api/user/payment-card',
        {
            cardType: cardType,
            name: name,
            cardNumber: cardNumber,
            expiryDate: expiryDate
        },
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });
    return res.data;
}

describe('Test cases for user registration.', () => {
    beforeEach(() => {
        jest.setTimeout(10000);
    });
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
        expect(registeredUser.message[0]).toBe(RESPONSE_MESSAGES.SUCCESS);

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

        expect(retryRegistration.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(retryRegistration.message[0]).toBe(RESPONSE_MESSAGES.DUPLICATE_ENTRY);

        deleteTestUser(registeredUser.body.id);
    })

    test("Do not register user with invalid email", async () => {
        const unregisteredUserWithInvalidEmail = await getUserResponseWithInvalidEmail();

        expect(unregisteredUserWithInvalidEmail.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(unregisteredUserWithInvalidEmail.message[0]).toBe(errorMessages.INVALID_EMAIL_FORMAT);
    })

    test("Do not register user with invalid password", async () => {
        const unregisteredUserWithInvalidPassword = await getUserResponseWithInvalidPassword();

        expect(unregisteredUserWithInvalidPassword.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(unregisteredUserWithInvalidPassword.message[0]).toBe(errorMessages.NO_UPPERCASE_LETTER_IN_PASSWORD);
        expect(unregisteredUserWithInvalidPassword.message[1]).toBe(errorMessages.NO_DIGIT_IN_PASSWORD);
        expect(unregisteredUserWithInvalidPassword.message[2]).toBe(errorMessages.SHORT_PASSWORD_LENGTH);
    })


    test("Add payment card details.", async () => {
        jest.setTimeout(15000);

        const registeredUser = await getSuccessfullyRegisteredUser();
        const response = await addPaymentCard(registeredUser.body.token, "AMEX", "Mashood Rafi", 2234567891234567, "2022-12-12");
        const listOfStripeResponses = UserFixture.stripeResponses();

        if (response.body.stripeId != null) {
            expect(response.body.message).toBe(listOfStripeResponses[5]);
        }

        if (response.body.stripeId == null) {
            expect(response.body.message).toBe(listOfStripeResponses.filter(message => message == response.body.message)[0]);
        }
        accessToken = registeredUser.body.token;
        testUserId = registeredUser.body.id;
        console.log(testUserId);
    });

    test("Adding expired card details.", async () => {
        jest.setTimeout(15000);

        const response = await addPaymentCard(accessToken, "AMEX", "Mashood Rafi", 1234567891234567, "2022-01-01");
        expect(response.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(response.message[0]).toBe('Card is expired');
    })


    test("Adding invalid card type.", async () => {
        jest.setTimeout(15000);

        const response = await addPaymentCard(accessToken, "invalid-card", "Mashood Rafi", 1234567891234567, "2022-12-12");

        expect(response.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(response.message[0]).toBe("Please enter the following list of card: VISA,VISA DEBIT,MASTERCARD,DISCOVER,JCB,AMERICAN EXPRESS,AMEX");
    })

    test("Adding invalid card number length.", async () => {
        jest.setTimeout(15000);

        const response = await addPaymentCard(accessToken, "AMEX", "Mashood Rafi", 123456789123456711, "2022-12-12");

        expect(response.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(response.message[0]).toBe(errorMessages.INVALID_CARD_NUMBER_LENGTH);
    })

    test("Adding card without correct authentication token.", async () => {
        jest.setTimeout(15000);

        const response = await addPaymentCard("invalid-token", "AMEX", "Mashood Rafi", 1234567891234567, "2022-12-12");

        expect(response.status).toBe(API_STATUS_CODES.AUTHORIZATION_FAILED);
        expect(response.message).toBe(errorMessages.INVALID_BEARER_TOKEN);
    })

    test("Adding card without authentication bearer token.", async () => {
        jest.setTimeout(15000);

        const response = await addPaymentCard("", "AMEX", "Mashood Rafi", 1234567891234567, "2022-12-12");

        expect(response.status).toBe(API_STATUS_CODES.AUTHORIZATION_FAILED);
        expect(response.message).toBe(errorMessages.INVALID_BEARER_TOKEN);

        await deleteTestUser(testUserId);
        console.log('Deleted now: ', testUserId);
    })
});