import { API_STATUS_CODES, RESPONSE_MESSAGES } from '../../constants/constants';

export default class PaymentCardAddedFactory {


    constructor(isCardSaved, stripeResponse) {
        this.message = isCardSaved ? stripeResponse.stripe_id : stripeResponse.error;
        if (stripeResponse.hasOwnProperty("error")) {
            this.message = stripeResponse.error;
            this.stripeId = null;
        }

        if (stripeResponse.hasOwnProperty("stripe_id") && isCardSaved) {
            this.message = "Card saved sucessfully.";
            this.stripeId = stripeResponse.stripe_id;
        }

        if (stripeResponse.hasOwnProperty("stripe_id") && !isCardSaved) {
            this.message = "Card could not be saved.";
            this.stripeId = null;
        }
    }


    /**
     * @param isCardSaved
     * @param stripeResponse 
     * @description Prepare response for user payment card added.
     */
    static async prepareResponse(isCardSaved, stripeResponse) {
        const response = new PaymentCardAddedFactory(isCardSaved, stripeResponse);
        return response;
    }
}