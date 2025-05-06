import express from 'express';
import UserController from '../controllers/user-controller.js';
import UserServices from '../services/user-services.js';
import UserRepository from '../repositories/user-repositories.js';
import loginValidator from '../middleware/login-validator.js';
import registroValidator from '../middleware/registro-validator.js';

const router = express.Router();
const userRepository = new UserRepository();
const userServices = new UserServices(userRepository);
const userController = new UserController(userServices);

router.post('/register', registroValidator.validatorParams, registroValidator.validator, userController.register);
router.post('/login', loginValidator.validatorParams, loginValidator.validator, userController.login); 
router.get('/profile', (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
