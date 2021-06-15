import validator from 'validator';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constants/constants';

import { CONTROLLER_ERROR, INVALID_REQUEST, AUTHORIZATION_FAILED } from '../../constants/errors';

export default class UserValidator {
    /**
     * @param req
     * @param res
     * @param next
     */
    static async registerValidator(req, res, next) {
        try {
            const { userName, password, email } = req.body;

            /*
                Validates that userName, password, email are of type string
                Validates that email type is correct.
            */
            if (typeof userName === 'string' && typeof password === 'string' && typeof email === 'string') {
                const isValidEmail = validator.isEmail(email);
                if (isValidEmail) {
                    const encryptedPassword = await bcrypt.hash(password, 10);
                    req.body.password = encryptedPassword;
                    next();
                } else {
                    res.json(INVALID_REQUEST);
                }
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
}
