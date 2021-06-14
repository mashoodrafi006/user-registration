import * as Sentry from '@sentry/node';
import config from '../config/config';
import { CONTROLLER_ERROR } from '../constants/errors';
import util from 'util';

const Hashids = require('hashids/cjs');

const salt = config.appLocation == 'KSA' ? 'habibti' : 'in5';
const hashIds = new Hashids(salt, 6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
export const encodeHashId = (id) => hashIds.encode(id);
export const decodeHashId = (id) => hashIds.decode(id)[0];

export const codeCrashResponse = async (res, error) => {
    Sentry.captureException(error);

    return res.json(CONTROLLER_ERROR);
};

export const consoleLog = (data) => console.log(util.inspect(data, false, null, true));
