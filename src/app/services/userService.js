import userRepository from '../repositories/userRepository';
import userLoginFactory from '../factories/userLoginFactory';
import userCreateFactory from '../factories/userCreateFactory';

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

userService.findUserById = async (userId) => {
    try {
        return await userRepository.findById(userId);
    } catch (error) {
        throw error;
    }
}

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

userService.saveUserPaymentCard = async (userCardDetails) => {
    try {
        return await userRepository.saveUserPaymentCardDetails(userCardDetails);
    } catch (error) {
        throw error;
    }
}

userService.deleteUserById = async (userId) => {
    try {
        await userRepository.deleteUserById(userId);
    } catch (error) {
        throw error;
    }
}

export default userService;
