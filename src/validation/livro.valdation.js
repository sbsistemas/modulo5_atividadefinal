import  { body, validationResult } from 'express-validator';

const validateLivroPost = [
    body('nome','O nome é obrigatorio').exists(),
    body('valor','O valor é obrigatorio').exists(),
    body('estoque','A estoque é obrigatoria').exists(),
    body('autorId','O autorId é obrigatório').exists(),
    body('nome','O nome não pode ser vazio').notEmpty(),
    body('valor','O valor não pode ser vazio').isDecimal( { min: 0.0}),
    body('estoque','O estoque não pode ser vazio').isInt( { min: 0}),
    body('autorId','O autorId não pode ser vazio').isInt( { min: 0})


];

const validateLivroUpdate = [
    body('livroId','O codigo do livro é obrigatorio').exists(),
    body('livroId','O codigo do livro não pode ser vazio').isInt( { min: 0}),
    body('nome','O nome é obrigatorio').exists(),
    body('valor','O valor é obrigatorio').exists(),
    body('estoque','A estoque é obrigatoria').exists(),
    body('autorId','O autorId é obrigatório').exists(),
    body('nome','O nome não pode ser vazio').notEmpty(),
    body('valor','O valor não pode ser vazio').isDecimal( { min: 0.0}),
    body('estoque','O estoque não pode ser vazio').isInt( { min: 0}),
    body('autorId','O autorId não pode ser vazio').isInt( { min: 0})

];

function checkRules  (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array()})
    }
    next();
}


export default {
    validateLivroPost,
    validateLivroUpdate,
    checkRules
};