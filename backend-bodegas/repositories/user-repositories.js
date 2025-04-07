import Persona from '../models/Persona.js';
import Usuario from '../models/Usuario.js';
import TipoUsuario from '../models/TipoUsuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class UserRepository {
  constructor() {
    this.collectionName = 'free_ai';
  }


  //Método para registrar un usuario
  async register(userData) {
    try {
      // Validamos los datos de entrada
      if(!userData.correo || !userData.password){
          throw new Error("Correo y contraseña son obligatorios");
      }
        

      const tipoUsuario = await TipoUsuario.findOne({ where: { id: userData.tipoUsuarioId } });
      if (!tipoUsuario) {
        throw new Error('El tipo de usuario proporcionado no existe');
      }

      // Verificar si el usuario ya existe
      const existingUser = await Persona.findOne({where: {correo: userData.correo} });
      if (existingUser) {
        throw new Error('El correo ya está registrado');
      }

      //Encriptar la contraseña
      const passwordHash = await bcrypt.hash(userData.password, 10);

      // Insertar el nuevo usuario
      const nuevaPersona = await Persona.create({
        id: userData.id,
        primerNombre: userData.primerNombre,
        segundoNombre: userData.segundoNombre,
        primerApellido: userData.primerApellido,
        segundoApellido: userData.segundoApellido,
        fechaNacimiento: userData.fechaNacimiento,
        telefono: userData.telefono,
        correo: userData.correo,
        direccion: userData.direccion,
      });

      const nuevoUsuario = await Usuario.create({
        password: passwordHash,
        personaId: nuevaPersona.id,
        tipoUsuarioId: userData.tipoUsuarioId
      });


      return {message: "Usuario creado con éxito", usuario: nuevaPersona, usuario: nuevoUsuario};
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Método para iniciar sesión
  async login(userData) {
    try {
      // Validamos los datos de entrada
      if (!userData.correo || !userData.password) {
        throw new Error('Correo y contraseña son obligatorios');
      }

      // Verificar si el usuario existe
      const usuario = await Usuario.findOne({
        include: [{ model: Persona, where: { correo: userData.correo } }],
      });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(userData.password, usuario.password);
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }

      const token = jwt.sign(
        {userId: userData.id, userEmail: userData.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    return { login: true, token }


    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserRepository;