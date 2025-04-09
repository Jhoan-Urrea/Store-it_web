import bcrypt from 'bcryptjs';
import { Persona, Usuario, Rol, UsuarioRol, TipoUsuario } from '../models/index.js';


class UserServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {

        try{
            // Mapear alias a los nombres esperados
            userData.correo = userData.correo || userData.email;
            userData.tipoUsuarioId = userData.tipoUsuarioId || (userData.tipoUsuario === 'cliente' ? 2 : userData.tipoUsuario === 'empleado' ? 1 : null);

            if (!userData.tipoUsuarioId) {
                throw new Error('El tipo de usuario proporcionado no es válido');
            }

            // Validamos los datos de entrada obligatorios
            if (!userData.primerNombre || !userData.primerApellido || !userData.fechaNacimiento || !userData.telefono || !userData.correo || !userData.password || !userData.tipoUsuarioId) {
                throw new Error("Los campos obligatorios no están completos");
            }
            console.log("Usuario válido, procesando registro...");
      
      
            //llamamos al repositorio para registrar el usuario
            return await this.userRepository.register(userData);
        }catch (error){
            throw new Error(error.message);
          
        }
    }

    async login(userData) {

        try{
          //Validamos que los campos sean correctos
          if(!userData.correo || !userData.password){
            throw new Error("Email y contraseña son obligatorios.")
          }
    
          return await this.userRepository.login(userData);
        }catch (error){
          throw new Error(error.message);
        }
        
    }
    
}

export default UserServices;
