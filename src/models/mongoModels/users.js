import mongoose from 'mongoose';

const users = mongoose.Schema({
    id: { type: Number },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    cards: { type: Array, default: null },
    registrationRequest: { type: String },
    status: { type: Boolean },
    createdAt: { type: String }
});
export default mongoose.model('users', users);
