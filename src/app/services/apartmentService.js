import apartmentsSearched from '../factories/searchedApartments';
import apartmentRepository from '../repositories/apartmentRepository';
import apartmentCreatedFactory from '../factories/apartmentCreatedFactory';
const apartmentService = {};

apartmentService.create = async (apartment) => {
    try {
        const apartmentCreated = await apartmentRepository.create(apartment);
        const apartmentResponse = apartmentCreatedFactory.prepareResponse(apartmentCreated);
        return apartmentResponse;
    } catch (error) {
        throw error;
    }
};

apartmentService.search = async (filters) => {
    try {
        const apartmentsFound = await apartmentRepository.search(filters);
        const apartmentsFoundResponse = apartmentsSearched.prepareResponse(apartmentsFound);
        return apartmentsFoundResponse;
    } catch (error) {
        throw error;
    }
};

apartmentService.findById = async (apartmentId) => {
    try {
        const apartmentsFound = await apartmentRepository.findById(apartmentId);
        return apartmentsFound;
    } catch (error) {
        throw error;
    }
};

export default apartmentService;
