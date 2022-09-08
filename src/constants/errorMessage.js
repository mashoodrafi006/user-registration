import logger from "../utils/logger";

let map = {};
const errorMessages = {};

/**
 * @escription Set error messages to validate user details.
*/
errorMessages.setErrorMessages = () => {
    try {
        map = {
            NO_LOWERCASE_LETTER_IN_PASSWORD: "Password should contain lowercase letter.",
            NO_UPPERCASE_LETTER_IN_PASSWORD: "Password should contain uppercase letter.",
            NO_DIGIT_IN_PASSWORD: "Password should contain atleast a digit in it.",
            SHORT_PASSWORD_LENGTH: "Password length should be greater than 8.",
            INVALID_EMAIL_FORMAT: "Invalid email address.",
            INVALID_EMAIL: "Email should be well formatted string",
            INVALID_USERNAME: "Username should be well formatted string",
            INVALID_PASSWORD_FORMAT: "Password should be well formatted string",
            USERNAME_EXISTS: "Username already exists.",
        };
    } catch (error) {
        logger.log({
            level: 'error',
            message: error,
        });
    }
}

errorMessages.getErrorMessages = () => {
    try {
        return map;
    } catch (error) {
        logger.log({
            level: 'error',
            message: error,
        });
    }
}

export default errorMessages;