export const API_STATUS_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    AUTHORIZATION_FAILED: 401,
    INVALID_REQUEST: 400,
    INTENAL_SERVER_ERROR: 500,
    DUPLICATE_ENTRY: 11000,
};

export const RESPONSE_MESSAGES = {
    SUCCESS: 'Sucess',
    AUTHORIZATION_FAILED: 'Authorization failed',
    DUPLICATE_ENTRY: 'Try other username or email.',
    USER_DELETED: "User deleted successfully.",
    REQUEST_SENT_TO_STRIPE: "Request was sent to Stripe.",
    USER_CREATED: "User registered successfully."
};

export const APP_ENVIRONMENTS = {
    LOCAL: 'local',
    DEV: 'dev',
    STAGING: 'staging',
    PRODUCTION: 'production',
};

export const passwordLength = 8;
export const paymentCardNumberLength = 16;
export const STRIPE_REQUEST_DELAY = {
    minTime: 5,
    maxTime: 10
}

export const stripeAvaiableCardTypes = ["VISA", "VISA DEBIT", "MASTERCARD", "DISCOVER", "JCB", "AMERICAN EXPRESS", "AMEX"];

export const JWT_TOKEN = 'eyJhbGciOiJ$IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzIzNTYyYjlkNTZkNjY1Yjk0NDkzYyIsInVzZXJOYW1lIjoibWFzaG9vZCBSYWZpIiwiaWF0IjoxNjIzMzQxNzU2fQ.vfJCCeMRdEhzkJEwgJybJ95zFm0eYuiYvUDpi2q3Of8';
