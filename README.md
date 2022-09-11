# rapidApi

## Get Started

1. **Install [Node] version v10.13.0,  install mongodb version v4.4.4**
2. **Clone this repository.** - `git clone https://github.com/mashoodrafi006/user-registration.git`
3. **Install Node Packages.** - `npm install`
4. **Run command on terminal** - `cp .env.example .env`
5. **Run the app.** - `npm run dev`

### Project Details

It's a project that registers user & add payment details using REST APIs. 
Login & register module has also been implimented using graphQl.

## Code Style

-   Install Prettier plugin for auto code refactor
-   Install ESLint plugin

## Code
-   branch-naming-check (to push only valid named branches on git.)
-   JWT (for authentication)
- 

## Testing

-   Use JEST for testing


## Execution of code
`npm run dev`

Once the server boots, enjoy triggering the APIs.

## Running test cases
First run `npm run dev`
Then run `npm run test` in a separate terminal

## Flow of Registration

1) Registration
- User registers itself using the Register API `register`
- The payload of request is heavily validated through layers of validation middleware.
- If the validation fails, the register request will fail back. Incase the validation is passed the user is registered and saved in the database with `status: true`. As a unique id, mongodb Object Id is used as a unique key for each user i.e in
ObjectId('631e2a46e30a4963a7ad4a6e') `631e2a46e30a4963a7ad4a6e` is considered unqiue id for a user.

2) Add payment details.
- Once the user is registered, user can make use of the JWT token returned from the Registeration process to add payment card.
- The payment details of the card are heavily validated through layers of validation middleware.
- If the validation fails, the API will return back to user with the detailed error messages. If the validations are passed, the request will be sent to Stripe (Imaginery request is sent to Stripe with a random delay, delay will be between 5-10 seconds. Based on the random delay a success message is sent back to the user or an error message.)

