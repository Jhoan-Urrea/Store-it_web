import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import TipoUsuario from '../models/TipoUsuario.js';
import Persona from '../models/Persona.js';
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
        console.log('Intentando login con:', { correo });

        const usuario = await Usuario.findOne({
            where: { correo },
            include: [{
                model: TipoUsuario,
                as: 'TipoUsuario',
                attributes: ['tipoUsuario']
            }]
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { 
                id: usuario.id,
                tipoUsuario: usuario.TipoUsuario.tipoUsuario 
            },
            process.env.JWT_SECRET || 'secreto_temporal',
            { expiresIn: '24h' }
        );

        console.log('Usuario autenticado:', {
            id: usuario.id,
            tipoUsuario: usuario.TipoUsuario.tipoUsuario
        });

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

router.post('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Aquí podrías invalidar el token si usas una lista negra
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_temporal');
        
        // Registrar el logout
        console.log(`Usuario ${decoded.id} cerró sesión`);
        
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_temporal');
    const usuario = await Usuario.findByPk(decoded.id, {
      include: [
        {
          model: Persona,
          attributes: ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido']
        },
        {
          model: TipoUsuario,
          as: 'TipoUsuario',
          attributes: ['tipoUsuario']
        }
      ]
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      id: usuario.id,
      nombre: `${usuario.Persona.primerNombre} ${usuario.Persona.primerApellido}`,
      rol: usuario.TipoUsuario.tipoUsuario,
      correo: usuario.correo
    });
  } catch (error) {
    console.error('Error en profile:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
