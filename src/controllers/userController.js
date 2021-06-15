import { codeCrashResponse } from '../utils/utils';
import userService from '../app/services/userService';
import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../constants/constants';

const userController = {};

userController.register = async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        const createdUser = await userService.create({ userName, password, email });
        let response = userController.prepareResponseBack(createdUser);

        return res.json(response);
    } catch (error) {
        if (error.code === API_STATUS_CODES.DUPLICATE_ENTRY) {
            return res.json({ status: API_STATUS_CODES.ERROR_CODE, message: RESPONSE_MESSAGES.DUPLICATE_ENTRY });
        }
        return codeCrashResponse(res, error);
    }
};

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
        console.log(error);
        return codeCrashResponse(res, error);
    }
};

userController.saveUserApartment = async (req, res) => {
    const { userId, apartmentId } = req.body;
    try {
        const isApartmentSaved = await userService.saveUserApartment({ userId, apartmentId });
        let response = userController.prepareResponseBack(isApartmentSaved);

        return res.json(response);
    } catch (error) {
        return codeCrashResponse(res, error);
    }
};

userController.markApartmentFavorite = async (req, res) => {
    const { userId, apartmentId, isFavorite } = req.body;
    try {
        const isApartmentSaved = await userService.markUserApartmentFavorite({ userId, apartmentId, isFavorite });
        let response = userController.prepareResponseBack(isApartmentSaved);

        return res.json(response);
    } catch (error) {
        return codeCrashResponse(res, error);
    }
};

userController.findUserFavoriteApartments = async (req, res) => {
    const { userId } = req.body;
    try {
        let userFavoriteApartments = await userService.findUserFavoriteApartments(userId);
        let response = userController.prepareResponseBack(userFavoriteApartments);

        return res.json(response);
    } catch (error) {
        return codeCrashResponse(res, error);
    }
};

userController.prepareResponseBack = (entities) => {
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

export default userController;
