import bcrypt from 'bcryptjs';
import { Persona, Usuario, Rol, UsuarioRol, TipoUsuario } from '../models/index.js';


class UserServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        ///console.log("BODY RECIBIDO EN BACKEND:", userData);
        const {
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            fechaNacimiento,
            telefono,
            correo,
            direccion,
            password,
            rolIds,           // array de roles
            tipoUsuarioId     // tipo de usuario (cliente, empleado, etc.)
        } = userData;

        /* // Validaciones básicas
         if (!primerNombre || !primerApellido || !correo || !password || !rolIds || !tipoUsuarioId) {
             throw new Error('Faltan datos obligatorios');
         }*/



        // Verificar si el correo ya existe
        const existing = await Usuario.findOne({
            include: {
                model: Persona,
                where: { correo }
            }
        });
        if (existing) {
            throw new Error('El correo ya está registrado');
        }

        // Crear Persona
        const persona = await Persona.create({
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            fechaNacimiento,
            telefono,
            correo,
            direccion
        });
        const tipoUsuario = await TipoUsuario.findByPk(tipoUsuarioId);
        if (!tipoUsuario) {
            throw new Error('El tipo de usuario no existe. Verifica tipoUsuarioId.');
        }

        // Crear Usuario
        const usuario = await Usuario.create({
            personaId: persona.id,
            password,
            tipoUsuarioId
        });

        // Asignar Roles
        const roles = await Rol.findAll({
            where: {
                id: rolIds
            }
        });
        await usuario.setRoles(roles);

        // Retornar el usuario con relaciones
        const usuarioConRelaciones = await Usuario.findByPk(usuario.id, {
            include: [
                { model: Persona },
                { model: Rol },
                { model: TipoUsuario }
            ]
        });

        return usuarioConRelaciones;
    }


    login = async ({ correo, password }) => {
        const persona = await Persona.findOne({ where: { correo }, include: Usuario });
        if (!persona || !persona.Usuario) throw new Error("Correo no registrado");

        const isMatch = await bcrypt.compare(password, persona.Usuario.password);
        if (!isMatch) throw new Error("Contraseña incorrecta");

        // Puedes generar aquí un token JWT o simplemente retornar los datos
        return {
            message: "Login exitoso",
            persona,
            usuario: persona.Usuario
        };
    }
}

export default UserServices;
