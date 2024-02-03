import  { body, validationResult } from 'express-validator';

const validateVendaPost = [
    body('livroId','O nome é obrigatorio').exists(),
    body('data','O valor é obrigatorio').exists(),
    body('valor','A estoque é obrigatoria').exists(),
    body('clienteId','O clienteId é obrigatório').exists(),
    body('data','O nome não pode ser vazio').notEmpty(),
    body('valor','O valor não pode ser vazio').isDecimal( { min: 0.0}),
    body('livroId','O estoque não pode ser vazio').isInt( { min: 0}),
    body('clienteId','O autorId não pode ser vazio').isInt( { min: 0})


];

const validateVendaUpdate = [
    body('vendaId','O codigo da Venda é obrigatoria').exists(),
    body('vendaId','O codigo da venda não pode ser vazia').isInt( { min: 0}),
    body('livroId','O nome é obrigatorio').exists(),
    body('data','O valor é obrigatorio').exists(),
    body('valor','A estoque é obrigatoria').exists(),
    body('clienteId','O clienteId é obrigatório').exists(),
    body('data','O nome não pode ser vazio').notEmpty(),
    body('valor','O valor não pode ser vazio').isDecimal( { min: 0.0}),
    body('livroId','O estoque não pode ser vazio').isInt( { min: 0}),
    body('clienteId','O autorId não pode ser vazio').isInt( { min: 0})

];

function checkRules  (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array()})
    }
    next();
}


export default {
    validateVendaPost,
    validateVendaUpdate,
    checkRules
};