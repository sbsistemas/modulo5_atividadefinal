import  { body, validationResult } from 'express-validator';

const validateClientePost = [
    body('nome','O nome é obrigatorio').exists(),
    body('email','O email é obrigatorio').exists(),
    body('senha','A senha é obrigatoria').exists(),
    body('telefone','O telefone é obrigatório').exists(),
    body('endereco','O endereço é obrigatório').exists(),
    body('nome','O nome não pode ser vazio').notEmpty(),
    body('email','O email não pode ser vazio').not().isEmpty().isEmail().normalizeEmail(),
    body('senha','A senha não pode ser vazao').notEmpty(),
    body('telefone','O telefone não pode ser vazio').notEmpty(),
    body('endereco','O endereço não pode ser vazio').notEmpty()


];

const validateClienteUpdate = [
    body('clienteId','O codigo do cliente é obrigatorio').exists(),
    body('nome','O nome é obrigatorio').exists(),
    body('email','O emeial é obrigatorio').exists(),
    body('senha','A senha é obrigatoria').exists(),
    body('telefone','O telefone é obrigatório').exists(),
    body('endereco','O endereço é obrigatório').exists(),
    body('clienteId','O codigo não pode ser vazio').isInt( { min: 0}),
    body('nome','O nome não pode ser vazio').notEmpty(),
    body('email','O email não pode ser vazio').not().isEmpty().isEmail().normalizeEmail(),
    body('senha','A senha não pode ser vazao').notEmpty(),
    body('telefone','O telefone não pode ser vazio').notEmpty(),
    body('endereco','O endereço não pode ser vazio').notEmpty()

];

function checkRules  (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array()})
    }
    next();
}


export default {
    validateClientePost,
    validateClienteUpdate,
    checkRules
};