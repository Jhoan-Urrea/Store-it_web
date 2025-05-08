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

    profile = async (req, res) => {

        try{
            return res.status(200).json({ 
                data: `Tu email leído en tu token es: ${req.user.userEmail}`,
                id: req.user.id,
                email: req.user.email
            });
        }catch(error){
            return res.status(400).json({ error: error.message });
        }
    }
}

export default UserController;
