export const CONTROLLER_ERROR = (errorMessage) => {
    return {
        status: 500,
        message: errorMessage,
        body: []
    }
};

export const INVALID_REQUEST = (errorMessage) => {
    return {
        status: 400,
        message: errorMessage,
        body: []
    }
};

export const AUTHORIZATION_FAILED = (errorMessage) => {
    return {
        status: 401,
        message: [errorMessage],
        body: []
    }
};