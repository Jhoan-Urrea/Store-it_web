import bcrypt from 'bcryptjs';
import { Persona, Usuario, Rol, UsuarioRol, TipoUsuario } from '../models/index.js';
import notificationService from './notification-services.js';

class UserServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
      console.log("Datos recibidos:", userData); 

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
            const result = await this.userRepository.register(userData);
            
            // Si el usuario es cliente, crear notificación de bienvenida
            if (userData.tipoUsuario === 'cliente') {
                await notificationService.createWelcomeNotification(result.usuario.id);
            }
            
            return result;
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

          const usuario = await this.userRepository.findByEmail(userData.correo);
          if(!usuario){
            throw new Error("Usuario no encontrado");
          }

          
        //Validamos la contraseña
        const isPasswordValid = await bcrypt.compare(userData.password, usuario.password);
        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta.");
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

      return { token, usuario };
    }catch (error){
      throw new Error(error.message);
    }
}
    
}
export default UserServices;
