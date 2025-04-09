import {check, validationResult} from 'express-validator';

const validatorParams = [
    check('primerNombre')
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('segundoNombre')
        .optional()
        .isString(),
    check('primerApellido')
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('segundoApellido')
        .optional()
        .isString(),
    check('fechaNacimiento')
        .notEmpty()
        .isISO8601(),
    check('telefono')
        .notEmpty()
        .isString()
        .isLength({ min: 10, max: 15 }),
    check('correo')
        .notEmpty()
        .isEmail()
        .withMessage('El campo correo debe ser un email válido'),
    check('password')
        .notEmpty()
        .isLength({ min: 6 }),
    check('direccion')
        .optional()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('createAt')
        .optional()
        .isDate()
        .withMessage('La fecha de creación es opcional y debe ser una fecha válida'),
    check('updateAt')
        .optional()
        .isDate()
        .withMessage('La fecha de actualización es opcional y debe ser una fecha válida'),
    check('tipoUsuario')
        .notEmpty()
        .isString()
        .custom((value) => {
            if (value !== 'cliente' && value !== 'empleado') {
                throw new Error('El tipo de usuario debe ser cliente o empleado');
            }
            return true;
        }),
    check('personaId') 
        .optional()
        .isInt()
        .withMessage('El campo empleadoId debe ser un número')
];

const validator = (req, res, next) => {
    console.log('Validando parámetros...'); // Agregar log para verificar la validación
     console.log(req.body); // Agregar log para verificar el cuerpo de la solicitud
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default { validatorParams, validator };