import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../utils/validators/userValidator';
const router = express.Router({});

router.post('/register', userValidator.registerValidator, userController.register);
router.patch('/user/payment-card', userValidator.addPaymentCardValidator, userController.addPaymentDetails);
router.post('/login', userValidator.loginValidator, userController.login);
router.delete("/user/:userId", userController.deleteUser)

module.exports = router;
