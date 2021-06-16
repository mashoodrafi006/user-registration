import userRepository from '../repositories/userRepository';
import userLoginFactory from '../factories/userLoginFactory';
import apartmentService from './apartmentService';
import userCreateFactory from '../factories/userCreateFactory';
import userFavoriteApartmentFactory from '../factories/userFavoriteApartments';

const userService = {};

userService.create = async (credentials) => {
    try {
        const userCreated = await userRepository.create(credentials);
        const createdUserResponse = userCreateFactory.prepareResponse(userCreated, credentials);
        return createdUserResponse;
    } catch (error) {
        throw error;
    }
};

userService.loginUser = async (credentials) => {
    try {
        const { userName, password } = credentials;
        const userFound = await userRepository.findUserFromUserName(userName);
        const userLoginToken = await userLoginFactory.prepareResponse({ userName, password, userFound });
        return userLoginToken;
    } catch (error) {
        throw error;
    }
};

userService.saveUserApartment = async (userApartmentDetails) => {
    try {
        this.isSaved = false;
        let promises = await userService.findUserAndApartment(userApartmentDetails);

        await Promise.all(promises).then(async (resolvedPromises) => {
            this.isSaved = await userRepository.saveUserApartment(resolvedPromises);
        });
        return { isApartmentSaved: this.isSaved };
    } catch (error) {
        throw error;
    }
};

userService.findUserAndApartment = async (userApartmentDetails) => {
    try {
        const promises = [];
        /* Both requests are sent asynchronously to improve performance */
        const { userId, apartmentId } = userApartmentDetails;
        const userPromise = new Promise((resolve) => {
            const user = userRepository.findById(userId);
            resolve(user);
        });
        const apartmentPromise = new Promise((resolve) => {
            const apartment = apartmentService.findById(apartmentId);
            resolve(apartment);
        });
        promises.push(userPromise);
        promises.push(apartmentPromise);
        return promises;
    } catch (error) {
        throw error;
    }
};

userService.markUserApartmentFavorite = async (userApartmentDetails) => {
    try {
        let markedFavorite = await userRepository.markUserApartmentFavorite(userApartmentDetails);
        return markedFavorite;
    } catch (error) {
        throw error;
    }
};

userService.findUserFavoriteApartments = async (userId) => {
    try {
        const userFavoriteApartments = await userRepository.findUserFavoriteApartments(userId);
        const response = userFavoriteApartmentFactory.prepareResponse(userFavoriteApartments);
        return response;
    } catch (error) {
        throw error;
    }
};
export default userService;
