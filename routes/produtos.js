const express = require('express')
const router = express.Router()
//const mongoose = require('mongoose')
const cors = require('cors')

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando CORS Middleware
router.use(cors())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Configurando JSON Middleware
router.use(
    express.urlencoded({
        extended:true,
    }),
)
router.use(express.json())

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Importanto models
const Produto = require('../model/Product')
//const Usuario = require('../model/User')
//const Pedido = require('-./model/Order')

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Rota principal
router.get('/', (req,res)=>{
    //res.render('')
})

//Configurando Rotas
//Rota incluir
router.get('/incluir',async (req,res)=>{
    //incluindo um registro/documento
    res.render('views/inclusao')
    //res.status(201).json({msg:'acesso na rota get'})
})
//aqui a gente separou os elementos para passar na rota
router.post('/incluir',async (req,res)=>{
    //Incluindo um registro/documento
    const {img,codBarra,nomeItem,tamanhoItem,precoItem,estoque,qtd} = req.body
    try {
            const novoProduto = {
                img: img,
                codBarra: codBarra,
                nomeItem: nomeItem,
                tamanhoItem: tamanhoItem,
                precoItem: precoItem,
                estoque: estoque,
                qtd: qtd
            }

        await Produto.create(novoProduto).then(result=>{
            console.log(result.insertedId)})
        
        console.log(req.body)
        console.log('Produto incluido no MongoDB!!')
        res.status(201).render('produto/inclusao', novoProduto)
        
    }catch(err){
        res.status(500).json({msg:'Falha na inclusão: '+err})
        return
    }
})

/*********************************/
//Rota listar
router.get('/listar',async(req,res)=>{
    console.log('Acesso na rota Produtos/listar')
    let produtos = []
    produtos = await Produto.find()
    res.json(produtos)
    return
})

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.delete('/excluir',async (req,res)=>{
    const id = req.body._id
    let produtos = []
    produtos = await Produto.findOneAndDelete({_id:id})
    res.json(produtos)
    return
})


module.exports = router
/*
router.get('/usuario/incluir',async (req,res)=>{
//incluindo um registro/documento
novoUsuario = new Usuario ({
    img: '/img/users/foto.png',
    nome: 'Joãozinho',
    email: 'joaozinho@mail.com',
    telefone: '+55(31)99899-7645'
})
await novoUsuario.save()

res.json(novoUsuario).status(201)
})
app.get('/usuario/listar',async(req,res)=>{
let usuarios=[]
usuarios = await Usuario.find()
res.json(usuarios)

return
})
*/
/*
app.get('/pedidos/incluir',async (req,res)=>{
//incluindo um registro/documento
novoPedido = new Pedido({
    usrId: "",
    itemsId: ["","",""]
})
await novoPedido.save()

res.json(novoPedido).status(201)
})

app.get('/pedidos/listar',async(req,res)=>{
let pedidos=[]
pedidos = await Pedido.find()
res.json(pedidos)
return
})
*/