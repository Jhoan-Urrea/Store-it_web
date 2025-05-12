import Bodega from './negocio/Bodega.js';
import Sector from './negocio/Sector.js';
import Puesto from './negocio/Puesto.js';
import TipoUsuario from './TipoUsuario.js';
import Usuario from './Usuario.js';

// Relación: Bodega → Sectores
Bodega.hasMany(Sector, {
  foreignKey: 'idBodega',
  as: 'sectores'
});
Sector.belongsTo(Bodega, {
  foreignKey: 'idBodega',
  as: 'bodega'
});

// Relación: Sector → Puestos
Sector.hasMany(Puesto, {
  foreignKey: 'idSector',
  as: 'puestos'
});
Puesto.belongsTo(Sector, {
  foreignKey: 'idSector',
  as: 'sector'
});

// Relación: TipoUsuario → Usuario
TipoUsuario.hasMany(Usuario, {
  foreignKey: 'tipoUsuarioId'
});
Usuario.belongsTo(TipoUsuario, {
  foreignKey: 'tipoUsuarioId'
});

export { Bodega, Sector, Puesto };
