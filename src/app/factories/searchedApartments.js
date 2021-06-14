export default class SearchedApartmentsFactory {
    constructor(apartments) {
        this.apartmentsFound = [];
        apartments.forEach((apartment) => {
            let apartmentFound = {
                _id: apartment._id,
                name: apartment.name,
                city: apartment.city,
                country: apartment.country,
                rooms: apartment.rooms,
                location: apartment.location.coordinates,
            };
            this.apartmentsFound.push(apartmentFound);
        });
    }

    /**
     * @param apartments
     * @description Prepare response for searched apartments.
     */
    static async prepareResponse(apartments) {
        try {
            const apartmentsObject = new SearchedApartmentsFactory(apartments);
            return apartmentsObject;
        } catch (error) {
            throw error;
        }
    }
}
