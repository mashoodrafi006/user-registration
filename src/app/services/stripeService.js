import stripeRepository from "../factories/stripeRepository";

const stripeService = {};

stripeService.addPaymentCard = async (userCardDetails) => {
    try {

        stripeRepository.addPaymentCardToStripe(userCardDetails);

    } catch (error) {
        throw error;
    }
}

export default stripeService;