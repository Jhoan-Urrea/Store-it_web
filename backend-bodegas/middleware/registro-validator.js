import {check, validationResult} from 'express-validator';

const validatorParams = [
    check('primerNombre')
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('segundoNombre')
        .optional()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('primerApellido')
        .notEmpty()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('segundoApellido')
        .optional()
        .isString()
        .isLength({ min: 3, max: 200 }),
    check('fechaNacimiento')
        .notEmpty()
        .isDate(),
    check('telefono')
        .notEmpty()
        .isString()
        .isLength({ min: 10, max: 15 }),
    check('correo')
        .isEmail()
        .notEmpty(),
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
    check('tipoUsuarioId')    
        .notEmpty()
        .isInt({min: 1})
        .custom ((value, { req }) => {
            if (value !== 1 && value !== 2) {
                throw new Error('El tipo de usuario debe ser 1 o 2');
            }
            return true;
        }),
    check('personaId') 
        .optional()
        .isInt()
        .withMessage('El campo empleadoId debe ser un número')
];

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default { validatorParams, validator };