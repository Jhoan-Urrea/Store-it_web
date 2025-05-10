import { sequelize } from '../config/database.js';
import Pais from '../models/ubicacion/Pais.js';
import Departamento from '../models/ubicacion/Departamento.js';
import Persona from '../models/Persona.js';
import Ciudad from '../models/ubicacion/Ciudad.js';
import Cliente from '../models/Cliente.js';
import TipoUsuario from '../models/TipoUsuario.js';
import TipoBodega from '../models/negocio/TipoBodega.js';
import Bodega from '../models/negocio/Bodega.js';
import Contrato from '../models/negocio/Contrato.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const seedInitialData = async () => {
  try {
    // 1. Crear o encontrar País
    const [pais] = await Pais.findOrCreate({
      where: { id: 1 },
      defaults: {
        nombre: 'Colombia',
        descripcion: 'República de Colombia'
      }
    });
    console.log('País encontrado/creado:', pais.nombre);

    // 2. Crear o encontrar Departamento
    const [departamento] = await Departamento.findOrCreate({
      where: { id: 1 },
      defaults: {
        nombre: 'Quindío',
        descripcion: 'Departamento del eje cafetero',
        idPais: pais.id
      }
    });
    console.log('Departamento encontrado/creado:', departamento.nombre);

    // 3. Crear o encontrar TipoUsuario
    const [tipoUsuario] = await TipoUsuario.findOrCreate({
      where: { tipoUsuario: 'cliente' },
      defaults: {
        nombre: 'Cliente Regular',
        descripcion: 'Usuario cliente estándar',
        tipoUsuario: 'cliente'
      }
    });
    console.log('Tipo Usuario encontrado/creado:', tipoUsuario.nombre);

    // 4. Crear o encontrar Persona
    const [persona] = await Persona.findOrCreate({
      where: { correo: 'juan@example.com' },
      defaults: {
        primerNombre: 'Juan',
        segundoNombre: 'Carlos',
        primerApellido: 'Pérez',
        segundoApellido: 'Gómez',
        fechaNacimiento: '1990-01-01',
        telefono: '3001234567',
        direccion: 'Calle 123'
      }
    });
    console.log('Persona encontrada/creada:', persona.primerNombre);

    // 4.1 Crear o encontrar Usuario para la Persona
    const hashedPassword = await bcrypt.hash('123456', 10);
    const [usuario] = await Usuario.findOrCreate({
      where: { correo: persona.correo },
      defaults: {
        correo: persona.correo,
        password: hashedPassword,
        tipoUsuarioId: tipoUsuario.id,
        personaId: persona.id
      }
    });
    console.log('Usuario encontrado/creado para:', persona.primerNombre);

    // 5. Crear o encontrar Ciudad
    const [ciudad] = await Ciudad.findOrCreate({
      where: { nombre: 'Armenia' }, // Cambiar la condición de búsqueda
      defaults: {
        nombre: 'Armenia',
        descripcion: 'Capital del Quindío',
        idDepartamento: departamento.id
      }
    });
    console.log('Ciudad encontrada/creada:', ciudad.nombre);
    
    // Verificar que la ciudad se creó correctamente
    if (!ciudad) {
      throw new Error('No se pudo crear/encontrar la ciudad');
    }

    // 6. Crear o encontrar Cliente
    const [cliente] = await Cliente.findOrCreate({
      where: { personaId: persona.id },
      defaults: {
        personaId: persona.id
      }
    });
    console.log('Cliente encontrado/creado con ID:', cliente.id);

    // 7. Crear o encontrar TipoBodega
    const [tipoBodega] = await TipoBodega.findOrCreate({
      where: { nombre: 'Estantería Estándar' },
      defaults: {
        nombre: 'Estantería Estándar',
        descripcion: 'Bodega con estanterías tradicionales',
        TipoBodega: 'estanteria estandar'
      }
    });
    console.log('Tipo Bodega encontrada/creada:', tipoBodega.nombre);

    // 8. Crear o encontrar Bodega
    const [bodega] = await Bodega.findOrCreate({
      where: { descripcion: 'Bodega Principal' },
      defaults: {
        descripcion: 'Bodega Principal',
        espacioOcupado: 0,
        largo: 100,
        ancho: 80,
        alto: 50,
        telefono: '3157894561',
        codigoPostal: '630001',
        direccion: 'Zona Industrial',
        estadoLleno: false,
        idCiudad: ciudad.id,
        idTipoBodega: tipoBodega.id
      }
    });
    console.log('Bodega encontrada/creada:', bodega.descripcion);

    // 9. Crear o encontrar Contrato
    const [contrato] = await Contrato.findOrCreate({
      where: { clienteId: cliente.id, bodegaId: bodega.id },
      defaults: {
        clienteId: cliente.id,
        bodegaId: bodega.id,
        fechaInicio: new Date(),
        fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        status: 'Pendiente',
        precioTotal: 1500000
      }
    });
    console.log('Contrato encontrado/creado con éxito');

    console.log('Datos iniciales sembrados correctamente');
  } catch (error) {
    console.error('Error específico:', error.message);
    if (error.parent?.detail) {
      console.error('Detalle del error:', error.parent.detail);
      console.error('Tabla:', error.parent.table);
      console.error('Constraint:', error.parent.constraint);
    }
    throw error;
  }
};
