import users from '../../models/mongoModels/users';
import moment from "moment";

const userRepository = {};

/**
 * @param credentials (includes userName, password, email)
 * @description Creates user.
 */
userRepository.create = async (credentials) => {
    try {
        const { userName, password, email } = credentials;
        const response = await users.create({
            userName,
            password,
            email,
            status: "ACTIVE",
            registrationRequest: JSON.stringify({ userName, password, email }),
            createdAt: moment().format("YYYY-DD-MM HH:MM:SS")
        });

        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * @param userName
 * @description Finds user from user name.
 */
userRepository.findUserFromUserName = async (userName) => {
    try {
        /* Lean method is used for faster queries and keeps the operation less memory intensive */
        const userPassword = await users
            .findOne({ userName })
            .select('_id userName password')
            .lean();
        return userPassword;
    } catch (error) {
        throw error;
    }
};

/**
 * @param userId
 * @description Finds user by id.
 */
userRepository.findById = async (userId) => {
    try {
        /* Lean method is used for faster queries and keeps the operation less memory intensive */
        /* Only active user should be fetched*/
        let user = await users.findById(userId).lean();

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * @param userCardDetails
 * @description Save card details embedded in user document.
 */
userRepository.saveUserPaymentCardDetails = async (userCardDetails) => {
    try {
        let isCardSaved = false;
        const paymentCardDetails = {
            "cardType": userCardDetails.cardType,
            "name": userCardDetails.name,
            "cardNumber": userCardDetails.cardNumber,
            "expiryDate": userCardDetails.expiryDate
        }

        let response = await users.updateOne({ _id: userCardDetails.userId }, { $addToSet: { cards: paymentCardDetails } });
        isCardSaved = !!response.nModified;

        return isCardSaved;
    } catch (error) {
        throw error;
    }
}

userRepository.deleteUserById = async (userId) => {
    try {
        await users.deleteOne({ _id: userId });
    } catch (error) {
        throw error;
    }
}

export default userRepository;
