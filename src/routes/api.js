import express from 'express';
import userController from '../controllers/userController';
import userValidator from '../utils/validators/userValidator';
import apartmentController from '../controllers/apartmentController';
import apartmentValidator from '../utils/validators/apartmentValidator';
import testController from '../controllers/testController';

const router = express.Router({});

router.post('/login', userValidator.loginValidator, userController.login);
router.post('/register', userValidator.registerValidator, userController.register);
router.patch('/user/apartment', userValidator.saveUserApartmentValidator, userController.saveUserApartment);
router.patch('/user/apartment/mark-favorite', userValidator.markApartmentFavoriteValidator, userController.markApartmentFavorite);
router.get('/user/apartments/favorite', userValidator.markUserFavoriteApartmentValidator, userController.findUserFavoriteApartments);

router.post('/apartment', apartmentValidator.createApartmentValidator, apartmentController.create);
router.get('/apartments', apartmentValidator.searchApartmentValidator, apartmentController.search);

router.get('/test', testController.test);

module.exports = router;
