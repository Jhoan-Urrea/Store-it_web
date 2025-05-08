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

  async findByEmail(correo){
    return await Usuario.findOne({where: {correo}});
  }

  async findByToken(token){
    return await Usuario.findOne({
      where: {
        reset_token: token,
        reset_token_expiration: { [Op.gt]: new Date() }
      }
    })
  }

  async saveResetToken(userId, token, expiration) {
    return await Usuario.update(
      { reset_token: token, reset_token_expiration: expiration },
      { where: { id: userId } }
    );
  }

  async clearResetToken(id) {
    await User.update(
      { reset_token: null, reset_token_expiration: null },
      { where: { id } }
    );
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

}

export default UserRepository;