import validator from 'validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { passwordLength } from "../../constants/constants";
import { JWT_TOKEN } from '../../constants/constants';
import logger from '../logger';
import errorMessage from "../../constants/errorMessage";

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
     * @param res
     * @param next
     */
    static async saveUserApartmentValidator(req, res, next) {
        try {
            const { apartmentId } = req.body;

            /* Check for authorization in headers */
            if (!req.headers.authorization) {
                return res.json(AUTHORIZATION_FAILED);
            }
            const bearer = UserValidator.fetchAccessToken(req);
            const JWTUser = UserValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED);
            }

            /*
                Validate object id of entities user/apartment
            */

            if (mongoose.Types.ObjectId.isValid(apartmentId)) {
                req.body.userId = JWTUser.data.id;
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
     * @param res
     * @param next
     */
    static async markApartmentFavoriteValidator(req, res, next) {
        try {
            const { apartmentId, isFavorite } = req.body;

            /* Check for authorization in headers */
            if (!req.headers.authorization) {
                return res.json(AUTHORIZATION_FAILED);
            }
            const bearer = UserValidator.fetchAccessToken(req);
            const JWTUser = UserValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED);
            }

            /*
                Validate object id of entities user/apartment
            */

            if (mongoose.Types.ObjectId.isValid(apartmentId) && typeof isFavorite === 'boolean') {
                req.body.userId = JWTUser.data.id;
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
     * @description Save user favorite apartment.
     */
    static markUserFavoriteApartmentValidator(req, res, next) {
        try {
            /* Check for authorization in headers */
            if (!req.headers.authorization) {
                return res.json(AUTHORIZATION_FAILED);
            }
            const bearer = UserValidator.fetchAccessToken(req);
            const JWTUser = UserValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED);
            }
            req.body.userId = JWTUser.data.id;
            next();
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

            if (!password.match(lowerCaseMatch)) errorListForRequest.push(mapOfErrorMessages.NO_LOWERCASE_LETTER_IN_PASSWORD);
            if (!password.match(upperCaseMatch)) errorListForRequest.push(mapOfErrorMessages.NO_UPPERCASE_LETTER_IN_PASSWORD);
            if (!password.match(validateNumbers)) errorListForRequest.push(mapOfErrorMessages.NO_DIGIT_IN_PASSWORD);
            if (password.length < passwordLength) errorListForRequest.push(mapOfErrorMessages.SHORT_PASSWORD_LENGTH);
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

            if (!(typeof userName === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_USERNAME);
            if (!(typeof password === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_PASSWORD_FORMAT);
            if (!(typeof email === 'string')) errorListForRequest.push(mapOfErrorMessages.INVALID_EMAIL);
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
