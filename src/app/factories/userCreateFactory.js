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
            if (user) {
                token = jwt.sign({ id: user._id, userName: user.userName }, JWT_TOKEN, { expiresIn: 10000 });
            }

            const userObject = new UserCreateFactory(user, userName, token);
            return userObject;
        } catch (error) {
            throw error;
        }
    }
}
