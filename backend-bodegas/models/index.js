import { sequelize } from '../config/database.js';

// Modelos existentes
import Cargo from './Cargo.js';
import Cliente from './Cliente.js';
import Empleado from './Empleado.js';
import UsuarioRol from './UsuarioRol.js';
import Persona from './Persona.js';
import Usuario from './Usuario.js';
import Rol from './Rol.js';
import TipoUsuario from './TipoUsuario.js';

//modelos de negocio
import Bodega from './negocio/Bodega.js';
import Puesto from './negocio/Puesto.js';
import Sector from './negocio/Sector.js';
import TipoBodega from './negocio/TipoBodega.js';

//modelos de ubicacion geografica
import Pais from './ubicacion/Pais.js';
import Departamento from './ubicacion/Departamento.js';
import Ciudad from './ubicacion/Ciudad.js';


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

// Relaciones entre Bodega, Sector, Puesto, TipoBodega
TipoBodega.hasMany(Bodega, { foreignKey: 'idTipoBodega' });
Bodega.belongsTo(TipoBodega, { foreignKey: 'idTipoBodega' });

Bodega.hasMany(Sector, { foreignKey: 'idBodega' });
Sector.belongsTo(Bodega, { foreignKey: 'idBodega' });

Sector.hasMany(Puesto, { foreignKey: 'idSector' });
Puesto.belongsTo(Sector, { foreignKey: 'idSector' });

// Relaciones geográficas
Pais.hasMany(Departamento, { foreignKey: 'idPais' });
Departamento.belongsTo(Pais, { foreignKey: 'idPais' });

Departamento.hasMany(Ciudad, { foreignKey: 'idDepartamento' });
Ciudad.belongsTo(Departamento, { foreignKey: 'idDepartamento' });

Ciudad.hasMany(Bodega, { foreignKey: 'idCiudad' });
Bodega.belongsTo(Ciudad, { foreignKey: 'idCiudad' });

export {
  sequelize,
  Cargo,
  Cliente,
  Empleado,
  Persona,
  Usuario,
  UsuarioRol,
  Rol,
  TipoUsuario,
  Bodega,
  Sector,
  Puesto,
  TipoBodega,
  Pais,
  Departamento,
  Ciudad
};
