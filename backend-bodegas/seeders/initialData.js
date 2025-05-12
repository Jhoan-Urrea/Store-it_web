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

    // 3. Crear o encontrar TipoUsuario Vendedor
    const [tipoUsuarioVendedor] = await TipoUsuario.findOrCreate({
      where: { tipoUsuario: 'vendedor' },
      defaults: {
        nombre: 'Vendedor',
        descripcion: 'Usuario vendedor estándar',
        tipoUsuario: 'vendedor'
      }
    });
    console.log('Tipo Usuario Vendedor encontrado/creado:', tipoUsuarioVendedor.nombre);

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

    // 4.2 Crear o encontrar Persona para Vendedor
    const [personaVendedor] = await Persona.findOrCreate({
      where: { correo: 'vendedor@example.com' },
      defaults: {
        primerNombre: 'Pedro',
        segundoNombre: 'Luis',
        primerApellido: 'García',
        segundoApellido: 'López',
        fechaNacimiento: '1985-05-15',
        telefono: '3001234568',
        direccion: 'Calle 456'
      }
    });
    console.log('Persona Vendedor encontrada/creada:', personaVendedor.primerNombre);

    // 4.3 Crear o encontrar Usuario para el Vendedor
    const hashedPasswordVendedor = await bcrypt.hash('123456', 10);
    const [usuarioVendedor] = await Usuario.findOrCreate({
      where: { correo: personaVendedor.correo },
      defaults: {
        correo: personaVendedor.correo,
        password: hashedPasswordVendedor,
        tipoUsuarioId: tipoUsuarioVendedor.id,
        personaId: personaVendedor.id
      }
    });
    console.log('Usuario Vendedor encontrado/creado para:', personaVendedor.primerNombre);

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

    // 8. Crear o encontrar múltiples Bodegas
    const bodegasData = [
      {
        descripcion: 'Bodega Principal',
        espacioOcupado: 0,
        largo: 100,
        ancho: 80,
        alto: 50,
        telefono: '3157894561',
        codigoPostal: '630001',
        direccion: 'Zona Industrial Principal',
        estadoLleno: false,
        idCiudad: ciudad.id,
        idTipoBodega: tipoBodega.id
      },
      {
        descripcion: 'Bodega Refrigerada',
        espacioOcupado: 0,
        largo: 80,
        ancho: 60,
        alto: 40,
        telefono: '3157894562',
        codigoPostal: '630002',
        direccion: 'Zona Industrial Sur',
        estadoLleno: false,
        idCiudad: ciudad.id,
        idTipoBodega: tipoBodega.id
      },
      {
        descripcion: 'Bodega Seguridad Alta',
        espacioOcupado: 0,
        largo: 120,
        ancho: 90,
        alto: 60,
        telefono: '3157894563',
        codigoPostal: '630003',
        direccion: 'Zona Industrial Norte',
        estadoLleno: false,
        idCiudad: ciudad.id,
        idTipoBodega: tipoBodega.id
      },
      {
        descripcion: 'Mini Bodega',
        espacioOcupado: 0,
        largo: 50,
        ancho: 40,
        alto: 30,
        telefono: '3157894564',
        codigoPostal: '630004',
        direccion: 'Centro Comercial Store-It',
        estadoLleno: false,
        idCiudad: ciudad.id,
        idTipoBodega: tipoBodega.id
      },
      {
        descripcion: 'Bodega Premium',
        espacioOcupado: 0,
        largo: 150,
        ancho: 100,
        alto: 70,
        telefono: '3157894565',
        codigoPostal: '630005',
        direccion: 'Zona Empresarial',
        estadoLleno: false,
        idCiudad: ciudad.id,
        idTipoBodega: tipoBodega.id
      }
    ];

    const bodegas = [];
    for (const bodegaData of bodegasData) {
      const [bodega] = await Bodega.findOrCreate({
        where: { descripcion: bodegaData.descripcion },
        defaults: bodegaData
      });
      bodegas.push(bodega);
      console.log('Bodega encontrada/creada:', bodega.descripcion);
    }

    // 9. Crear o encontrar Contratos
    const contratos = [
      {
        clienteId: cliente.id,
        bodegaId: 5, // Bodega Principal
        fechaInicio: new Date(),
        fechaFin: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        status: 'Pendiente',
        precioTotal: 1500000
      },
    ];

    for (const contratoData of contratos) {
      const [contrato] = await Contrato.findOrCreate({
        where: { 
          clienteId: contratoData.clienteId,
          bodegaId: contratoData.bodegaId,
          status: contratoData.status
        },
        defaults: contratoData
      });
      console.log(`Contrato ${contrato.status} creado/encontrado para bodega ${contratoData.bodegaId}`);
    }

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
