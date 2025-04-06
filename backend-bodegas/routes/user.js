import express from 'express';
import UserController from '../controllers/user-controller.js';
import UserServices from '../services/user-services.js';
import UserRepository from '../repositories/user-repositories.js';

const router = express.Router();
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const userController = new UserController(userServices);

router.post('/register', userController.register);
router.post('/login', userController.login); 
router.get('/profile', userController.profile);

export default router;
