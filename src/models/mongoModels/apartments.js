import mongoose from 'mongoose';

const apartments = mongoose.Schema(
    {
        id: { type: Number },
        name: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        rooms: { type: Number, required: true },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: { type: [Number], default: [0, 0] },
        },
    },
    {
        strict: false,
    },
);

apartments.index({ location: '2dsphere' });

export default mongoose.model('apartments', apartments);
