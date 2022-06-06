//*******************************/
//Configurando models (schema)
//Esse arquivo está sendo "require" no index.js

const mongoose=require('mongoose')

const Produto = mongoose.model('produtos', {
    img: String,
    codBarra: String,
    nomeItem: String,
    tamanhoItem: String,
    precoItem: Number,
    estoque: Number,
    qtd: Number
})

module.exports = Produto