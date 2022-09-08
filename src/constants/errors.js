export const CONTROLLER_ERROR = (errorMessage) => {
    return {
        status: 500,
        message: errorMessage
    }
};

export const INVALID_REQUEST = (errorMessage) => {
    return {
        status: 400,
        message: errorMessage
    }
};

export const AUTHORIZATION_FAILED = {
    status: 401,
    message: 'Authorization failed.',
};