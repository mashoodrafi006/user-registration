import logger from '../../utils/logger';

export default class UserFavoriteApartmentsFactory {
    constructor(userFavoriteApartments) {
        try {
            this.favoriteApartments = [];
            if (userFavoriteApartments) {
                userFavoriteApartments.apartments.forEach((favoriteApartment) => {
                    try {
                        const apartment = {
                            name: favoriteApartment.name,
                            city: favoriteApartment.city,
                            country: favoriteApartment.country,
                            rooms: favoriteApartment.rooms,
                            location: favoriteApartment.location.coordinates,
                        };
                        this.favoriteApartments.push(apartment);
                    } catch (error) {
                        logger.log({
                            level: 'error',
                            message: error.message,
                        });
                    }
                });
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param userFavoriteApartments
     * @description Prepare response for user favorite apartments.
     */
    static async prepareResponse(userFavoriteApartments) {
        try {
            const response = new UserFavoriteApartmentsFactory(userFavoriteApartments);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
