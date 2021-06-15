import bcrypt from 'bcryptjs';
import apartmentService from '../app/services/apartmentService';
import userService from '../app/services/userService';

export const resolvers = {
    Query: {
        login: async (_, { userName, password }) => {
            const user = await userService.findUserFromUserName({ userName, password });
            return user;
        },
        findUserFavoriteApartments: async (_, userId) => {
            const user = await userService.findUserFavoriteApartments(userId.userId);
            return user.favoriteApartments;
        },
        searchApartments: async (_, { city, country, rooms, latitude, longitude, minDistance, maxDistance, offset, limit }) => {
            try {
                const apartments = await apartmentService.search({ city, country, rooms, location: { coordinates: [latitude, longitude], minDistance, maxDistance }, offset, limit });
                return apartments.apartmentsFound;
            } catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        register: async (_, { userName, password, email }) => {
            try {
                password = await bcrypt.hash(password, 10);
                const registeredUser = await userService.create({ userName, password, email });
                return registeredUser;
            } catch (error) {
                return { id: '', userName: '', token: '' };
            }
        },
        createApartment: async (_, { name, city, country, rooms, latitude, longitude }) => {
            try {
                const apartmentCreated = await apartmentService.create({ name, city, country, rooms, location: { type: 'Point', coordinates: [latitude, longitude] } });
                return apartmentCreated;
            } catch (error) {
                console.log(error);
            }
        },
        saveUserApartment: async (_, { userId, apartmentId }) => {
            try {
                const isApartmentSaved = await userService.saveUserApartment({ userId, apartmentId });

                return isApartmentSaved;
            } catch (error) {
                console.log(error);
            }
        },
        markUserFavoriteApartment: async (_, { userId, apartmentId, isFavorite }) => {
            try {
                const isApartmentSaved = await userService.markUserApartmentFavorite({ userId, apartmentId, isFavorite });
                return { isApartmentSaved: isApartmentSaved.isApartmentMarkedFavorite };
            } catch (error) {
                console.log(error);
            }
        },
    },
};
