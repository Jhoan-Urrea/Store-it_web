import {check, validationResult} from 'express-validator';

const validatorParams = [
    check('correo')
        .isEmail()
        .notEmpty(),
    check('password')
        .notEmpty()
        .isLength({ min: 6 })
];

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default { validatorParams, validator };