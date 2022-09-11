import moment from "moment";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logger';
import mongoose from 'mongoose';
import validator from 'validator';
import { JWT_TOKEN } from '../../constants/constants';
import errorMessage from "../../constants/errorMessage";
import { passwordLength } from "../../constants/constants";
import { stripeAvaiableCardTypes, paymentCardNumberLength } from "../../constants/constants";
import { CONTROLLER_ERROR, INVALID_REQUEST, AUTHORIZATION_FAILED } from '../../constants/errors';

export default class UserValidator {
    /**
     * @param req
     * @param res
     * @param next
     */
    static async registerValidator(req, res, next) {
        try {
            let errorListForRequest = [];
            const mapOfErrorMessages = errorMessage.getErrorMessages();
            const { userName, password, email } = req.body;

            /** Validate user details. */
            errorListForRequest = UserValidator.validateUserDetails(userName, password, email, errorListForRequest, mapOfErrorMessages);
            if (errorListForRequest.length) return res.json(INVALID_REQUEST(errorListForRequest));

            /** Validates for strong password. */
            errorListForRequest = UserValidator.validateStrongPassword(password, errorListForRequest, mapOfErrorMessages);
            if (errorListForRequest.length) return res.json(INVALID_REQUEST(errorListForRequest));

            const encryptedPassword = await bcrypt.hash(password, 10);
            req.body.password = encryptedPassword;
            next();

        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
    * @param req
    * @param res
    * @param next
    */
    static async addPaymentCardValidator(req, res, next) {
        try {
            let errorListForRequest = [];
            const cardDetails = req.body;
            const mapOfErrorMessages = errorMessage.getErrorMessages();

            /* Check for authorization in headers */
            if (!req.headers.authorization) {
                return res.json(AUTHORIZATION_FAILED(mapOfErrorMessages.NO_BEARER_TOKEN));
            }
            const bearer = UserValidator.fetchAccessToken(req);
            const JWTUser = UserValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED(mapOfErrorMessages.INVALID_BEARER_TOKEN));
            }

            errorListForRequest = UserValidator.validatePaymentDetails(cardDetails, errorListForRequest, mapOfErrorMessages);
            if (errorListForRequest.length) return res.json(INVALID_REQUEST(errorListForRequest));
            req.body.userId = JWTUser.data.id;

            next();
        } catch (error) {
            console.log(error);
            logger.log({
                level: 'error',
                message: error.message,
            });
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param cardDetails
     * @param errorListForRequest
     * @param mapOfErrorMessages
     * @Description Validates that payment details passes all validations 
     */    static validatePaymentDetails(cardDetails, errorListForRequest, mapOfErrorMessages) {
        try {
            //add comment to each validation.
            let { cardType, cardNumber, name, expiryDate } = cardDetails;

            /* cardType should be present in the request & of type string. */
            if (!cardDetails.hasOwnProperty("cardType") || typeof cardType !== "string") errorListForRequest.push(mapOfErrorMessages.CARD_TYPE_MISSING);

            /* name of the card holder should be present in the request & of type string.  */
            if (!cardDetails.hasOwnProperty("name") || typeof name !== "string") errorListForRequest.push(mapOfErrorMessages.NAME_OF_CARD_HOLDER_MISSING);

            /* cardNumber should be present. */
            if (!cardDetails.hasOwnProperty("cardNumber")) errorListForRequest.push(mapOfErrorMessages.CARD_NUMBER_MISSING);

            /* expiry date should be present. */
            if (!cardDetails.hasOwnProperty("expiryDate")) errorListForRequest.push(mapOfErrorMessages.CARD_EXPIRY_DATE_MISSING);

            /* Valid expiry date format should be provided. */
            if (!moment(expiryDate, 'YYYY-DD-MM', true).isValid()) errorListForRequest.push(mapOfErrorMessages.INVALID_EXPIRY_DATE_FORMAT);

            if (errorListForRequest.length) return errorListForRequest;

            cardType = cardDetails.cardType.trim();
            cardNumber = cardDetails.cardNumber.toString();

            cardType = stripeAvaiableCardTypes.includes(cardType.toUpperCase());

            /* Only allow given list of cards to be accepted. */
            if (!cardType) errorListForRequest.push(mapOfErrorMessages.INVALID_CARD_TYPE + stripeAvaiableCardTypes);

            /* Card number should have 16 digits. */
            if (cardNumber.length != paymentCardNumberLength) errorListForRequest.push(mapOfErrorMessages.INVALID_CARD_NUMBER_LENGTH);

            if (typeof name !== "string") errorListForRequest.push(mapOfErrorMessages.INVALID_CARD_HOLDER_NAME);

            /* expiry date should be in future. */
            if (!moment(expiryDate).isAfter(moment())) errorListForRequest.push(mapOfErrorMessages.EXPIRED_CARD);

            return errorListForRequest;
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            throw error;
        }
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    static async loginValidator(req, res, next) {
        try {
            const { userName, password } = req.body;
            if (typeof userName === 'string' && typeof password === 'string') {
                next();
            } else {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }

    /**
     * @param req
     * @description Fetch JWT access from request header.
     */
    static fetchAccessToken(req) {
        try {
            const jwt = req.headers.authorization;
            const bearer = jwt.split(' ');
            return bearer[1];
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param bearer
     * @description Fetch user associated with JWT.
     */
    static fetchJWTUser(bearer) {
        try {
            let JWTdata;
            try {
                /* Verify the JWT provided in the request. */
                const user = jwt.verify(bearer, JWT_TOKEN);
                JWTdata = user;
            } catch (error) {
                JWTdata = error.message;
            }
            /* Validate that id provided by JWT resolution is valid mongo id. */
            return typeof JWTdata === 'object' && mongoose.Types.ObjectId.isValid(JWTdata.id) ? { isValidTokan: true, data: JWTdata } : { isValidTokan: false, data: JWTdata };
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param password (Password entered by the user)
     * @param errorListForRequest (List of validation errors)
     * @param mapOfErrorMessages (List of existing validation error messages in the system.)
     * @description Check if the password passes all validation rules.
     */
    static validateStrongPassword = (password, errorListForRequest, mapOfErrorMessages) => {
        try {
            const lowerCaseMatch = /[a-z]/g;
            const upperCaseMatch = /[A-Z]/g;
            const validateNumbers = /[0-9]/g;

            /* password to have lowercase letter. */
            if (!password.match(lowerCaseMatch)) errorListForRequest.push(mapOfErrorMessages.NO_LOWERCASE_LETTER_IN_PASSWORD);

            /* password to have uppercase letter. */
            if (!password.match(upperCaseMatch)) errorListForRequest.push(mapOfErrorMessages.NO_UPPERCASE_LETTER_IN_PASSWORD);

            /* password to have digits. */
            if (!password.match(validateNumbers)) errorListForRequest.push(mapOfErrorMessages.NO_DIGIT_IN_PASSWORD);

            /* password length should be greater than 8. */
            if (password.length < passwordLength) errorListForRequest.push(mapOfErrorMessages.SHORT_PASSWORD_LENGTH);

            /* password should be valid string. */
            if (!(typeof password === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_PASSWORD_FORMAT);

            return errorListForRequest;
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            throw error;
        }
    }

    /**
     * @param username
     * @param password
     * @param email
     * @param errorListForRequest (List of validation errors)
     * @param mapOfErrorMessages (List of existing validation error messages in the system.)
     * @description Check if user details passes all validation rules.
     */
    static validateUserDetails = (userName, password, email, errorListForRequest, mapOfErrorMessages) => {
        try {

            /* userName should be of type string. */
            if (!(typeof userName === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_USERNAME);

            /* password should be of type string. */
            if (!(typeof password === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_PASSWORD_FORMAT);

            /* email should be of type string.  */
            if (!(typeof email === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_EMAIL);

            /* email should be valid. */
            if (!validator.isEmail(email)) errorListForRequest.push(mapOfErrorMessages.INVALID_EMAIL_FORMAT);

            return errorListForRequest;
        } catch (error) {
            logger.log({
                level: 'error',
                message: error.message,
            });
            throw error;
        }
    }
}
