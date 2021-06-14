import config from '../../config/config';
import { API_STATUS_CODES } from '../../constants/constants';

export default class Auth {
    /**
     * auth token verification
     */
    // eslint-disable-next-line consistent-return
    static async isAuthorized(req, res, next) {
        const authKey = req.headers.authorization;
        const validToken = config.POS_AUTHORIZATION_KEYS.includes(authKey);
        if (validToken) {
            next();
        } else {
            return res.json({
                status: API_STATUS_CODES.AUTHORIZATION_FAILED,
                message: 'Authorization failed.',
            });
        }
    }
}
