export default class UserFixture {
    static returnLoggedInUser() {
        const loggedInUser = {
            id: '60c7b74c1d23b36c2c272cf4',
            userName: 'Mashood Rafi',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzdiNzRjMWQyM2IzNmMyYzI3MmNmNCIsInVzZXJOYW1lIjoiTWFzaG9vZCBSYWZpIiwiaWF0IjoxNjIzNzQwMDk3LCJleHAiOjE2MjM3NTAwOTd9.gnMrYzwGkefV3xj1ORcbzFoHxqO5U1jwWmf46s5yQYw',
        };

        return loggedInUser;
    }

    static stripeResponses() {
        return ["Faulty card, please contact administrator.",
            "Invalid customer ID.",
            "Stripe service is down.",
            "Request timed out, please try again.",
            "This card has been blocked for security reasons by the card holder.",
            "Card saved sucessfully."
        ];
    }
}
