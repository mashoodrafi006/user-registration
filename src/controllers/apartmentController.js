import { codeCrashResponse } from '../utils/utils';
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';
import apartmentService from '../app/services/apartmentService';
const apartmentController = {};

apartmentController.create = async (req, res) => {
    try {
        const { name, city, country, rooms, location } = req.body;
        const apartment = await apartmentService.create({ name, city, country, rooms, location });
        let response = apartmentController.prepareResponseBack(apartment);

        return res.json(response);
    } catch (error) {
        return codeCrashResponse(res, error);
    }
};

apartmentController.search = async (req, res) => {
    try {
        const { city, country, rooms, offset, limit } = req.query;
        const { location } = req.body;
        const apartments = await apartmentService.search({ city, country, rooms, location, offset, limit });
        let response = apartmentController.prepareResponseBack(apartments);

        return res.json(response);
    } catch (error) {
        return codeCrashResponse(res, error);
    }
};

apartmentController.prepareResponseBack = (entities) => {
    try {
        let response = {};
        response.status = API_STATUS_CODES.SUCCESS;
        response.message = RESPONSE_MESSAGES.SUCCESS;
        response.body = entities;
        return response;
    } catch (error) {
        throw error;
    }
};

export default apartmentController;
