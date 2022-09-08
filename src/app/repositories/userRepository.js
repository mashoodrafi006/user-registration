import mongoose from 'mongoose';
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
            status: true,
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
            /* Save user  with his new apartment if both user and apartments are validated. */
            apartment.isFavorite = false;
            let response = await users.updateOne({ _id: user._id }, { $addToSet: { apartments: apartment } });
            apartmentSaved = !!response.nModified;
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
        return { isApartmentMarkedFavorite: !!response.nModified };
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
        /* Validate if _id of user is a valid mongoose id. */
        if (mongoose.Types.ObjectId.isValid(userId)) {
            /* Fetch apartments of users with attribute isFavorite set as true. */
            response = await users.aggregate([{ $match: { _id: mongoose.Types.ObjectId(userId), 'apartments.isFavorite': true } }, { $unwind: '$apartments' }, { $match: { 'apartments.isFavorite': true } }, { $group: { _id: '$_id', apartments: { $push: '$apartments' } } }]);
        }
        return response[0];
    } catch (error) {
        throw error;
    }
};

export default userRepository;
