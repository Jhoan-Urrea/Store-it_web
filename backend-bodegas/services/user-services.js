class UserServices{

    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async register(userData) {
        try{
            //Validamos los datos de entrada
            if(!userData.primerNombre || !userData.segundoNombre || !userData.primerApellido || !userData.segundoApellido || !userData.fechaNacimiento || !userData.telefono || !userData.correo || !userData.password || !userData.direccion || !userData.createAt || !userData.updateAt){
              throw new Error("Todos los campos son obligatorios");
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
            //Validamos los datos de entrada
            if(!userData.correo || !userData.password){
                throw new Error("Todos los campos son obligatorios");
            }
      
            return await this.userRepository.login(userData);
          }catch (error){
            throw new Error(error.message);
          }
    }
}

export default UserServices;