
export default class PaymentCardAddedFactory {

    constructor(isCardSaved, stripeResponse) {
        this.status = stripeResponse.status;

        /* Incase the requests fails from Stripe*/
        if (stripeResponse.hasOwnProperty("error")) {
            this.message = stripeResponse.error;
            this.stripeId = null;
        }

        /* Card added successfully on Stripe*/
        if (stripeResponse.hasOwnProperty("stripe_id") && isCardSaved) {
            this.message = "Card saved sucessfully.";
            this.stripeId = stripeResponse.stripe_id;
        }

        /* Success response from Stripe but card could not be added because it was already added. */
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