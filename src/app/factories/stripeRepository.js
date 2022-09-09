const stripeRepository = {};

stripeRepository.addPaymentCardToStripe = async (userCardDetails) => {
    try {
        const randomDelay = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
        console.log(randomDelay);
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, randomDelay * 1000);
        });

        console.log("resolved.");

    } catch (error) {
        throw error;
    }
}

export default stripeRepository;