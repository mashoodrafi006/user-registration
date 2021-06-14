import mongoose from 'mongoose';

const favoriteApartments = mongoose.Schema(
    {
        id: { type: Number, unique: true },
        userId: { type: Number, required: true },
        apartmentId: { type: Number, required: true },
    },
    {
        strict: false,
    },
);

export default mongoose.model('favoriteApartments', favoriteApartments);
