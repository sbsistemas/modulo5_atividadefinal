import  { body, validationResult } from 'express-validator';

const validateAutorPost = [
    body('nome','O nome é obrigatorio').exists(),
    body('email','O email é obrigatorio').exists(),
    body('telefone','O telefone é obrigatório').exists(),
    body('nome','O nome não pode ser vazio').notEmpty(),
    body('email','O email não pode ser vazio').not().isEmpty().isEmail().normalizeEmail(),
    body('telefone','O telefone não pode ser vazio').notEmpty()


];

const validateAutorUpdate = [
    body('autorId','O codigo do autor é obrigatorio').exists(),
    body('nome','O nome é obrigatorio').exists(),
    body('email','O emeial é obrigatorio').exists(),
    body('telefone','O telefone é obrigatório').exists(),
    body('autorId','O codigo não pode ser vazio').isInt( { min: 0}),
    body('nome','O nome não pode ser vazio').notEmpty(),
    body('email','O email não pode ser vazio').not().isEmpty().isEmail().normalizeEmail(),
    body('telefone','O telefone não pode ser vazio').notEmpty()

];

function checkRules  (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array()})
    }
    next();
}


export default {
    validateAutorPost,
    validateAutorUpdate,
    checkRules
};