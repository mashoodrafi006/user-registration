import apartments from '../../models/mongoModels/apartments';

const apartmentRepository = {};

/**
 * @param apartment (includes name, city, country, rooms, location)
 * @description Creates apartment.
 */
apartmentRepository.create = async (apartment) => {
    try {
        const { name, city, country, rooms, location } = apartment;
        const apartmentCreated = await apartments.create({ name, city, country, rooms, location });
        return apartmentCreated;
    } catch (error) {
        throw error;
    }
};

/**
 * @param filters (includes city, country, rooms)
 * @description Search apartment.
 */
apartmentRepository.search = async (filters) => {
    try {
        const { city, country, rooms, location, offset, limit } = filters;
        let query = {};
        /*
            $regex to ensure case insensitive query for string filters
        */
        if (city) {
            query.city = { $regex: new RegExp(city, 'i') };
        }
        if (country) {
            query.country = { $regex: new RegExp(country, 'i') };
        }
        if (rooms) {
            query.rooms = rooms;
        }
        if (location) {
            query.location = {
                $near: {
                    $geometry: { type: 'Point', coordinates: [location.coordinates[0], location.coordinates[1]] },
                    $minDistance: location.minDistance,
                    $maxDistance: location.maxDistance,
                },
            };
        }

        const apartmentsFound = await apartments
            .find(query)
            .select('_id name city country rooms location')
            .lean()
            .skip(offset)
            .limit(limit);

        return apartmentsFound;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * @param apartmentId
 * @description Finds apartment from id.
 */
apartmentRepository.findById = async (apartmentId) => {
    try {
        const apartment = await apartments.findById(apartmentId).lean();
        return apartment;
    } catch (error) {
        throw error;
    }
};

export default apartmentRepository;
