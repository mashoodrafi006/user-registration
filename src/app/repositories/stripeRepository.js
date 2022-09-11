import { STRIPE_REQUEST_DELAY } from "../../constants/constants";
const stripeRepository = {};

/**
 * @param userCardDetails (includes userId, name, email, cardNumber, cardType, expiryDate)
 * @description Sends request to Stripe to add card details and responds back with the response.
 */
stripeRepository.addPaymentCardToStripe = async (userCardDetails) => {
    try {
        let stripeResponse = {
            email: userCardDetails.email
        };

        /* Imaginary axios call here to STRIPE with payment details to add the card using {userCardDetails}. */
        let randomDelay = Math.floor(Math.random() * (STRIPE_REQUEST_DELAY.maxTime - STRIPE_REQUEST_DELAY.minTime + 1)) + STRIPE_REQUEST_DELAY.minTime;
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, randomDelay * 1000);
        });
        /* Response back from stripe after a {randomDelay} in seconds. */

        switch (randomDelay) {
            case 5:
                stripeResponse.stripe_id = userCardDetails.userId + randomDelay;
                break;

            case 6:
                stripeResponse.error = "Card already added to user.";
                break;

            case 7:
                stripeResponse.error = "Invalid customer ID.";
                break;

            case 8:
                stripeResponse.error = "Stripe service is down.";
                break;

            case 9:
                stripeResponse.error = "Request timed out, please try again.";
                break;

            case 10:
                stripeResponse.error = "This card has been blocked for security reasons by the card holder.";
                break;
        }

        return stripeResponse;
    } catch (error) {
        throw error;
    }
}

export default stripeRepository;