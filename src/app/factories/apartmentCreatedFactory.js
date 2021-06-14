export default class ApartmentCreatedFactory {
    constructor(apartment) {
        this.name = apartment.name;
        this.city = apartment.city;
        this.country = apartment.country;
        this.rooms = apartment.rooms;
        this.location = apartment.location.coordinates;
    }

    /**
     * @param apartment
     * @description Prepare response for created apartment.
     */
    static async prepareResponse(apartment) {
        try {
            const apartmentObject = new ApartmentCreatedFactory(apartment);
            return apartmentObject;
        } catch (error) {
            throw error;
        }
    }
}
