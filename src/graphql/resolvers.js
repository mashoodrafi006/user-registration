import bcrypt from 'bcryptjs';
import logger from '../utils/logger';
import userService from '../app/services/userService';

export const resolvers = {
    Query: {
        login: async (_, { userName, password }) => {
            const user = await userService.loginUser({ userName, password });
            return user;
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
        }
    },
};
