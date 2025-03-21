import {sequelize} from '../config/database.js';
import Cargo from './Cargo.js';
import Cliente from './Cliente.js';
import Empleado from './Empleado.js';
import Persona from './Persona.js';
import Rol from './Rol.js';
import Usuario from './Usuario.js';
import UsuarioRol from './UsuarioRol.js';


// Definir relaciones
Persona.hasOne(Empleado, { foreignKey: 'personaId' });
Persona.hasOne(Cliente, { foreignKey: 'personaId' });
Empleado.belongsTo(Persona);
Cliente.belongsTo(Persona);

Usuario.belongsTo(Persona, { foreignKey: 'personaId' });
Usuario.belongsToMany(Rol, { through: UsuarioRol });
Rol.belongsToMany(Usuario, { through: UsuarioRol });

export { sequelize, Cargo, Cliente, Empleado, Persona, Rol, Usuario, UsuarioRol };
