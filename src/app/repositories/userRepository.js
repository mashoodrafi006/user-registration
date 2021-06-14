import users from '../../models/mongoModels/users';
import mongoose from 'mongoose';

const userRepository = {};

/**
 * @param credentials (includes userName, password, email)
 * @description Creates user.
 */
userRepository.create = async (credentials) => {
    try {
        const { userName, password, email } = credentials;
        const response = await users.create({ userName, password, email });
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
        let user = await users.findById(userId).lean();

        return user;
    } catch (error) {
        throw error;
    }
};

/**
 * @param apartmentDetail
 * @description Save user his new apartment.
 */
userRepository.saveUserApartment = async (apartmentDetail) => {
    try {
        let apartmentSaved = false;
        const user = apartmentDetail[0];
        const apartment = apartmentDetail[1];

        if (user && apartment) {
            apartment.isFavorite = false;
            let response = await users.updateOne({ _id: user._id }, { $addToSet: { apartments: apartment } });
            apartmentSaved = response.nModified ? true : false;
        }
        return apartmentSaved;
    } catch (error) {
        throw error;
    }
};

/**
 * @param apartmentDetail
 * @description Mark user apartment favorite.
 */
userRepository.markUserApartmentFavorite = async (apartmentDetail) => {
    try {
        const { userId, apartmentId, isFavorite } = apartmentDetail;
        const response = await users.updateOne({ _id: mongoose.Types.ObjectId(userId), 'apartments._id': mongoose.Types.ObjectId(apartmentId) }, { $set: { 'apartments.$.isFavorite': isFavorite } });
        return { isApartmentMarkedFavorite: response.nModified ? true : false };
    } catch (error) {
        throw error;
    }
};

/**
 * @param userId
 * @description Find user favorite apartments.
 */
userRepository.findUserFavoriteApartments = async (userId) => {
    try {
        let response = [];
        if (mongoose.Types.ObjectId.isValid(userId)) {
            response = await users.aggregate([{ $match: { _id: mongoose.Types.ObjectId(userId), 'apartments.isFavorite': true } }, { $unwind: '$apartments' }, { $match: { 'apartments.isFavorite': true } }, { $group: { _id: '$_id', apartments: { $push: '$apartments' } } }]);
        }
        return response[0];
    } catch (error) {
        throw error;
    }
};

export default userRepository;
