import { sequelize } from '../config/database.js';
import Cargo from './Cargo.js';
import Cliente from './Cliente.js';
import Empleado from './Empleado.js';
import UsuarioRol from './UsuarioRol.js';
import Persona from './Persona.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';
import TipoUsuario from './TipoUsuario.js';

// Relaciones Persona -> Cliente/Empleado
Persona.hasOne(Empleado, { foreignKey: 'personaId' });
Empleado.belongsTo(Persona);

Persona.hasOne(Cliente, { foreignKey: 'personaId' });
Cliente.belongsTo(Persona);

// Persona -> Usuario
Persona.hasOne(Usuario, { foreignKey: 'personaId' });
Usuario.belongsTo(Persona, { foreignKey: 'personaId' });

// Usuario -> TipoUsuario
TipoUsuario.hasMany(Usuario, { foreignKey: 'tipoUsuarioId' });
Usuario.belongsTo(TipoUsuario, { foreignKey: 'tipoUsuarioId' });

// Usuario -> Rol (many-to-many)
Usuario.belongsToMany(Rol, { through: UsuarioRol });
Rol.belongsToMany(Usuario, { through: UsuarioRol });

export {
  sequelize,
  Cargo,
  Cliente,
  Empleado,
  Persona,
  Usuario,
  UsuarioRol,
  Rol,
  TipoUsuario
};
