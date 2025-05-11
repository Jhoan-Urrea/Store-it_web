import jwt from 'jsonwebtoken';

export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (!allowedRoles.includes(req.user.tipoUsuario)) {
                return res.status(403).json({ 
                    message: 'Access denied: insufficient permissions' 
                });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

export const roleOptions = {
    CLIENTE: 'cliente',
    VENDEDOR: 'vendedor',
    ADMIN: 'admin'
};
