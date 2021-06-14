export const API_STATUS_CODES = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    AUTHORIZATION_FAILED: 401,
    ERROR_CODE: 400,
    INTENAL_SERVER_ERROR: 500,
    DUPLICATE_ENTRY: 11000,
};
export const RESPONSE_MESSAGES = {
    SUCCESS: 'Sucess',
    BEFORE_CUTOFF: 'You cannot accept orders before cutoff.',
    KITCHEN_FOUND: 'Fetched kitchen details.',
    KITCHEN_NOT_FOUND: 'Kitchen not found.',
    FETCHED_STATS: 'Fetched kitchen stats.',
    ORDERS_FOUND: 'Orders fetched.',
    ORDERS_NOT_FOUND: 'Orders not found.',
    DRIVERS_FOUND: 'Fetched drivers.',
    DRIVERS_NOT_FOUND: 'No drivers found.',
    AUTHORIZATION_FAILED: 'Authorization failed',
    DUPLICATE_ENTRY: 'Try other username or email.',
};

export const APP_ENVIRONMENTS = {
    LOCAL: 'local',
    DEV: 'dev',
    STAGING: 'staging',
    PRODUCTION: 'production',
};

export const JWT_TOKEN = 'eyJhbGciOiJ$IUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzIzNTYyYjlkNTZkNjY1Yjk0NDkzYyIsInVzZXJOYW1lIjoibWFzaG9vZCBSYWZpIiwiaWF0IjoxNjIzMzQxNzU2fQ.vfJCCeMRdEhzkJEwgJybJ95zFm0eYuiYvUDpi2q3Of8';
