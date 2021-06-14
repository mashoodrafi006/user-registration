import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '../../constants/constants';

export default class UserLoginFactory {
    constructor(userName, token, userFound) {
        try {
            this.id = userFound._id;
            this.userName = userName;
            this.token = token;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @param user
     * @description Prepare response for login user.
     */
    static async prepareResponse(credentials) {
        const { userName, password, userFound } = credentials;
        let userObject = { id: '', userName: '', token: '' };
        let token = '';
        if (userFound && (await bcrypt.compare(password, userFound.password))) {
            token = jwt.sign({ id: userFound._id, userName }, JWT_TOKEN, { expiresIn: 10000 });
            userObject = new UserLoginFactory(userName, token, userFound);
        }
        return userObject;
    }
}
