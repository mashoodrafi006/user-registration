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

            NO_BEARER_TOKEN: "Authorization bearer token is missing from header.",
            INVALID_BEARER_TOKEN: "Invalid authorization token.",

            INVALID_CARD_TYPE: "Please enter the following list of card: ",
            INVALID_CARD_NUMBER_LENGTH: "Card number should be of 16 digits.",
            INVALID_CARD_HOLDER_NAME: "Invalid card holder name.",
            EXPIRED_CARD: "Card is expired",
            INVALID_EXPIRY_DATE_FORMAT: "Please provide the expiry date in YYYY-DD-MM format i.e 2022-30-01",
            INCORRECT_CARD_NUMBER: "Incorrect card number, card number should contain digits only.",

            CARD_TYPE_MISSING: "Card type should be present & with type string.",
            NAME_OF_CARD_HOLDER_MISSING: "Name of card holder should be present & with type string.",
            CARD_NUMBER_MISSING: "Card number should be present",
            CARD_EXPIRY_DATE_MISSING: "Card expiry date is missing"

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