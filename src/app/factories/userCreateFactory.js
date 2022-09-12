import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constants/constants';

export default class UserCreateFactory {
    constructor(user, userName, token) {
        this.id = user._id;
        this.userName = userName;
        this.token = token;
    }

    /**
     * @param user
     * @description Prepare response for created user.
     */
    static async prepareResponse(user) {
        try {
            let token = '';
            const { userName } = user;
            /* Validate if user found. */
            if (user) {
                /* Generate JWT token for user */
                token = jwt.sign({ id: user._id, userName: user.userName }, JWT_TOKEN, { expiresIn: 24 * 60 * 60 * 12 });
            }
            const userObject = new UserCreateFactory(user, userName, token);

            return userObject;
        } catch (error) {
            throw error;
        }
    }
}
