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

    const functions = Object.keys(userController);
    test('It should contain all functions.', async () => {
        expect(functions).toContain('register');
        expect(functions).toContain('login');
        expect(functions).toContain('addPaymentDetails');
    });

    /* Given */
    test("Register user successfully.", async () => {

        /* When*/
        const registeredUser = await getSuccessfullyRegisteredUser();

        /* Then */
        expect(registeredUser.status).toBe(API_STATUS_CODES.CREATED);
        expect(registeredUser.message[0]).toBe(RESPONSE_MESSAGES.USER_CREATED);

        deleteTestUser(registeredUser.body.id);
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 2000)
        });
    })

    /* Given */
    test("Do not register duplicate user.", async () => {

        /* When*/
        const registeredUser = await getSuccessfullyRegisteredUser();
        const retryRegistration = await getSuccessfullyRegisteredUser();

        /* Then */
        expect(retryRegistration.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(retryRegistration.message[0]).toBe(RESPONSE_MESSAGES.DUPLICATE_ENTRY);

        deleteTestUser(registeredUser.body.id);
    })

    /* Given */
    test("Do not register user with invalid email", async () => {

        /* When*/
        const unregisteredUserWithInvalidEmail = await getUserResponseWithInvalidEmail();

        /* Then */
        expect(unregisteredUserWithInvalidEmail.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(unregisteredUserWithInvalidEmail.message[0]).toBe(errorMessages.INVALID_EMAIL_FORMAT);
    })

    /* Given */
    test("Do not register user with invalid password", async () => {

        /* When*/
        const unregisteredUserWithInvalidPassword = await getUserResponseWithInvalidPassword();


        /* Then */
        expect(unregisteredUserWithInvalidPassword.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(unregisteredUserWithInvalidPassword.message[0]).toBe(errorMessages.NO_UPPERCASE_LETTER_IN_PASSWORD);
        expect(unregisteredUserWithInvalidPassword.message[1]).toBe(errorMessages.NO_DIGIT_IN_PASSWORD);
        expect(unregisteredUserWithInvalidPassword.message[2]).toBe(errorMessages.SHORT_PASSWORD_LENGTH);
    })


    /* Given */
    test("Add payment card details.", async () => {
        jest.setTimeout(15000);

        /* When*/
        const registeredUser = await getSuccessfullyRegisteredUser();
        const response = await addPaymentCard(registeredUser.body.token, "AMEX", "Mashood Rafi", 2234567891234567, "2022-12-12");
        const listOfStripeResponses = UserFixture.stripeResponses();

        /* Then */
        if (response.body.stripeId != null) {
            expect(response.body.message).toBe(listOfStripeResponses[5]);
        }

        if (response.body.stripeId == null) {
            expect(response.body.message).toBe(listOfStripeResponses.filter(message => message == response.body.message)[0]);
        }
        accessToken = registeredUser.body.token;
        testUserId = registeredUser.body.id;
    });

    /* Given */
    test("Do not add card with expired card details.", async () => {
        jest.setTimeout(15000);

        /* When*/
        const response = await addPaymentCard(accessToken, "AMEX", "Mashood Rafi", 1234567891234567, "2022-01-01");

        /* Then */
        expect(response.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(response.message[0]).toBe('Card is expired');
    })

    /* Given */
    test("Do not add card with invalid card type.", async () => {
        jest.setTimeout(15000);

        /* When*/
        const response = await addPaymentCard(accessToken, "invalid-card", "Mashood Rafi", 1234567891234567, "2022-12-12");

        /* Then */
        expect(response.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(response.message[0]).toBe("Please enter the following list of card: VISA,VISA DEBIT,MASTERCARD,DISCOVER,JCB,AMERICAN EXPRESS,AMEX");
    })

    /* Given */
    test("Do not add card with invalid card number length.", async () => {
        jest.setTimeout(15000);

        /* When*/
        const response = await addPaymentCard(accessToken, "AMEX", "Mashood Rafi", 123456789123456711, "2022-12-12");

        /* Then */
        expect(response.status).toBe(API_STATUS_CODES.INVALID_REQUEST);
        expect(response.message[0]).toBe(errorMessages.INVALID_CARD_NUMBER_LENGTH);
    })

    /* Given */
    test("Do not add card without correct authentication token.", async () => {
        jest.setTimeout(15000);

        /* When*/
        const response = await addPaymentCard("invalid-token", "AMEX", "Mashood Rafi", 1234567891234567, "2022-12-12");

        /* Then */
        expect(response.status).toBe(API_STATUS_CODES.AUTHORIZATION_FAILED);
        expect(response.message[0]).toBe(errorMessages.INVALID_BEARER_TOKEN);
    })

    /* Given */
    test("Do not add card without authentication bearer token.", async () => {
        jest.setTimeout(15000);

        /* When*/
        const response = await addPaymentCard("", "AMEX", "Mashood Rafi", 1234567891234567, "2022-12-12");

        /* Then */
        expect(response.status).toBe(API_STATUS_CODES.AUTHORIZATION_FAILED);
        expect(response.message[0]).toBe(errorMessages.INVALID_BEARER_TOKEN);

        await deleteTestUser(testUserId);
    })
});