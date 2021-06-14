import isValidCoordinates from 'is-valid-coordinates';
import validator from 'validator';
import { CONTROLLER_ERROR, INVALID_REQUEST, AUTHORIZATION_FAILED } from '../../constants/errors';

import userValidator from '../validators/userValidator';

export default class ApartmentValidator {
    /**
     * @param req
     * @param res
     * @param next
     */
    static async createApartmentValidator(req, res, next) {
        try {
            const { name, city, country, rooms, location } = req.body;

            if (!req.headers['authorization']) {
                return res.json(AUTHORIZATION_FAILED);
            }
            const bearer = userValidator.fetchAccessToken(req);
            const JWTUser = userValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED);
            }

            /* 
                Validates that name, city, country are of type string and rooms of type number
                Validates that location type is a Point and the coordinates has valid coordinates.
            */
            if (typeof name === 'string' && typeof city === 'string' && typeof country === 'string' && typeof rooms === 'number' && location.type === 'Point' && isValidCoordinates(location.coordinates[0], location.coordinates[1])) {
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
    static async searchApartmentValidator(req, res, next) {
        try {
            let isValidLocation = false;
            let isValidRequest = false;
            let { city, country, rooms, offset, limit } = req.query;
            if (city) {
                req.query.city = city = validator.escape(city);
            }
            if (country) {
                req.query.country = country = validator.escape(country);
            }

            if (!req.headers['authorization']) {
                return res.json(AUTHORIZATION_FAILED);
            }
            const bearer = userValidator.fetchAccessToken(req);
            const JWTUser = userValidator.fetchJWTUser(bearer);
            if (!JWTUser.isValidTokan) {
                return res.json(AUTHORIZATION_FAILED);
            }

            /*
                Validates that location is valid
            */
            const { location } = req.body;
            if (location && isValidCoordinates(location.coordinates[0], location.coordinates[1]) && typeof location.minDistance === 'number' && location.minDistance >= 0 && typeof location.maxDistance === 'number' && location.maxDistance && location.maxDistance >= location.minDistance) {
                isValidLocation = true;
            }

            /*
                Sets default pagination
                For now I've used skip, limit for pagination but this greatly effects performance for large number of documents to its better to use last cursor for better performance.
            */
            if (!(typeof offset === 'number' && offset >= 0 && typeof limit === 'number' && limit >= 1)) {
                req.query.offset = 0;
                req.query.limit = 10;
            }
            /* 
                Validates that city, country and rooms are of correct types and either of them is present as a filter
            */
            if ((city && typeof city === 'string') || (country && typeof country === 'string') || (rooms && typeof rooms === 'number') || isValidLocation) {
                if (location && isValidLocation) {
                    isValidRequest = true;
                    next();
                } else if (!location && !isValidLocation) {
                    isValidRequest = false;
                } else {
                    next();
                }
            }
            if (!isValidRequest) {
                res.json(INVALID_REQUEST);
            }
        } catch (error) {
            res.json(CONTROLLER_ERROR);
        }
    }
}
