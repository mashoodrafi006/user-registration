import { CONTROLLER_ERROR } from '../constants/errors';

export const codeCrashResponse = async res => res.json(CONTROLLER_ERROR);
