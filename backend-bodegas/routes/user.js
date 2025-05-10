import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import TipoUsuario from '../models/TipoUsuario.js';
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
router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        console.log('Intentando login con:', { correo, password });

        const usuario = await Usuario.findOne({
            where: { correo },
            include: [{
                model: TipoUsuario,
                attributes: ['tipoUsuario']
            }]
        });

        console.log('Usuario encontrado:', usuario);

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password);
        console.log('Validación de contraseña:', validPassword);

        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { 
                id: usuario.id,
                tipoUsuario: usuario.TipoUsuario.tipoUsuario 
            },
            process.env.JWT_SECRET || 'secreto_temporal',
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: {
                id: usuario.id,
                tipoUsuario: usuario.TipoUsuario.tipoUsuario
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.get('/profile', (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
