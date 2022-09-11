import logger from '../utils/logger';
import { codeCrashResponse } from '../utils/utils';
import userService from '../app/services/userService';
import stripeService from "../app/services/stripeService";
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';
import PaymentCardAddedFactory from '../app/factories/PaymentCardAddedFactory';

const userController = {};

/* Register user. */
userController.register = async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        const createdUser = await userService.create({ userName, password, email });

        let response = {
            status: API_STATUS_CODES.CREATED,
            message: [RESPONSE_MESSAGES.USER_CREATED],
            body: createdUser
        }
        return res.json(response);
    } catch (error) {
        if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
            return res.json({ status: API_STATUS_CODES.INVALID_REQUEST, message: [RESPONSE_MESSAGES.DUPLICATE_ENTRY] });
        }
        return codeCrashResponse(res, error);
    }
};

/* Add user payment card. */
userController.addPaymentDetails = async (req, res) => {
    try {
        const { userId, name, cardNumber, cardType, expiryDate } = req.body;
        let isCardAdded = false;
        const user = await userService.findUserById(userId);
        const stripeAddCardResponse = await stripeService.addPaymentCard({ userId, name, email: user.email, cardNumber, cardType, expiryDate });

        if (stripeAddCardResponse.hasOwnProperty("stripe_id")) {
            /* Card added to Stripe successfuly. */
            isCardAdded = await userService.saveUserPaymentCard({ userId, name, cardNumber, cardType, expiryDate });
        }

        const messageFromStripe = await PaymentCardAddedFactory.prepareResponse(isCardAdded, stripeAddCardResponse);
        let response = {
            status: API_STATUS_CODES.SUCCESS,
            message: [RESPONSE_MESSAGES.REQUEST_SENT_TO_STRIPE],
            body: messageFromStripe
        }

        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}

/* Login user. */
userController.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        let response = {};
        const userLoginToken = await userService.loginUser({ userName, password });
        response.status = userLoginToken.token ? API_STATUS_CODES.SUCCESS : API_STATUS_CODES.AUTHORIZATION_FAILED;
        response.message = userLoginToken.token ? RESPONSE_MESSAGES.SUCCESS : RESPONSE_MESSAGES.AUTHORIZATION_FAILED;
        response.body = userLoginToken;

        return res.json(response);
    } catch (error) {
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
};

/* Delete user. */
userController.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        userService.deleteUserById(userId);

        const response = {
            status: API_STATUS_CODES.SUCCESS,
            message: RESPONSE_MESSAGES.USER_DELETED,
            body: []
        }

        return res.json(response);
    } catch (error) {
        console.log(error);
        logger.log({
            level: 'error',
            message: error.message,
        });
        return codeCrashResponse(res, error);
    }
}

export default userController;
