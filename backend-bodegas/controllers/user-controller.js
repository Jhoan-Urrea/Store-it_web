class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }

    register = async (req, res) => {
        try {
            const newUser = await this.userServices.register(req.body);
            return res.status(201).json({ message: "Usuario creado exitosamente", data: newUser });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    login = async (req, res) => {
        try {
            const result = await this.userServices.login(req.body);
            return res.status(200).json({ result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    getProfile = async (req, res) => {
        try {
            const userData = {
                id: req.user.id,
                nombre: req.user.nombre,
                email: req.user.email,
                rol: req.user.rol,
                permisos: req.user.permisos
            };
            return res.status(200).json(userData);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;
