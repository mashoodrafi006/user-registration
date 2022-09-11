import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../utils/validators/userValidator';
import apartmentController from '../controllers/apartmentController';
import apartmentValidator from '../utils/validators/apartmentValidator';

const router = express.Router({});

router.post('/register', userValidator.registerValidator, userController.register);
router.patch('user/payment-card', userValidator.addPaymentCardValidator, userController.addPaymentDetails);
router.post('/login', userValidator.loginValidator, userController.login);
router.delete("/user/:userId", userController.deleteUser)


router.patch('/user/apartment', userValidator.saveUserApartmentValidator, userController.saveUserApartment);
router.patch('/user/apartment/mark-favorite', userValidator.markApartmentFavoriteValidator, userController.markApartmentFavorite);
router.get('/user/apartments/favorite', userValidator.markUserFavoriteApartmentValidator, userController.findUserFavoriteApartments);

router.post('/apartment', apartmentValidator.createApartmentValidator, apartmentController.create);
router.get('/apartments', apartmentValidator.searchApartmentValidator, apartmentController.search);

module.exports = router;
