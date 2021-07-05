import mongoose from 'mongoose';

const users = mongoose.Schema({
    id: { type: Number },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    apartments: { type: Array, default: null },
});
export default mongoose.model('users', users);
