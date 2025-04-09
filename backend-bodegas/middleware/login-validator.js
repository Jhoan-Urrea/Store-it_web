import {check, validationResult} from 'express-validator';

const validatorParams = [
    check('correo')
        .isEmail()
        .notEmpty(),
    check('password')
        .notEmpty()
        .isString()
        .isLength({ min: 6 })
];

const validator = (req, res, next) => {
    console.log('Validando parámetros de login', req.body
        
    ); // Agregar log para verificar la validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default { validatorParams, validator };