import Persona from '../models/persona.js';
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

        try{
            if(!userData.correo || !userData.password){
                throw new Error("Correo y contraseña son obligatorios");
            }
        }catch (error) {
            throw new Error("Email y contraseña son obligatorios.");
        }

      // Verificar si el usuario ya existe
      const existingUser = await Persona.findOne({where: {correo: userData.correo} });
      if (existingUser) {
        throw new Error('El correo ya está registrado');
      }

      //Encriptar la contraseña
      const passwordHash = await bcrypt.hash(userData.password, 10);

      // Insertar el nuevo usuario
      const nuevoUsuario = await Persona.create({
        id: userData.id,
        primerNombre: userData.primerNombre,
        segundoNombre: userData.segundoNombre,
        primerApellido: userData.primerApellido,
        segundoApellido: userData.segundoApellido,
        fechaNacimiento: userData.fechaNacimiento,
        telefono: userData.telefono,
        correo: userData.correo,
        direccion: userData.direccion,
        password: passwordHash,
        createAt: userData.createAt,
        updateAt: userData.updateAt
      });

      return {message: "Usuario creado con éxito", usuario: nuevoUsuario};
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
      const usuario = await Persona.findOne({where: {correo: userData.correo} });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(userData.password, usuario.password);
      if (!passwordMatch) {
        throw new Error('Contraseña incorrecta');
      }
    } catch (error) {
      throw new Error(error.message);
    }

    const token = jwt.sign(
        {userId: userData.id, userEmail: userData.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
    return { login: true, token }
    
  }
}

export default UserRepository;