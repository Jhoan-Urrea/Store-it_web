export const getContratos = async () => {
  try {
    // ...existing code to fetch contracts from the database...
    return contratos; // Asegúrate de que esta variable contiene los datos correctos
  } catch (error) {
    console.error('Error al obtener contratos desde la base de datos:', error);
    throw new Error('No se pudieron obtener los contratos');
  }
};
