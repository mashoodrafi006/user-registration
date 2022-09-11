import stripeRepository from "../repositories/stripeRepository";

const stripeService = {};

stripeService.addPaymentCard = async (userCardDetails) => {
    try {
        return await stripeRepository.addPaymentCardToStripe(userCardDetails);
    } catch (error) {
        throw error;
    }
}

export default stripeService;