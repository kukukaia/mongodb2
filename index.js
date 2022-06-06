//**************************/
//requisição de moduloes
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

//**************************/
//Configurando JSON Middleware
app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(express.json())

//**************************/
//Configurando/Conectando Mongoose

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

const Produto = require('./model/Product')
const Usuario = require('./model/User')
const Pedido = require('./model/Order')

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.bodoj94.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        console.log('conectado ao MongoDB')
    })
    .catch((err)=> {
        console.log("Houve um erro ao se conectar ao mongoDB: "+err)
    })

//**************************/
    //Configurando Rotas
    app.get('/produto/incluir',async (req,res)=>{
        //incluindo um registro/documento
        //res.render('views/inclusao')
        res.status(201).json({msg:'acesso na rota get'})
    })

    app.post('/produto/incluir',async (req,res)=>{
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
            await Produto.create(novoProduto)
            res.status(201).json(novoProduto)
            
        }catch(err){
            res.status(500).json({msg:'Falha na inclusão: '+er})
            return
        }
    })
app.get('/produto/listar',async(req,res)=>{
    let produtos=[]
    produtos = await Produto.find()
    res.json(produtos)
    return
})
app.get('/usuario/incluir',async (req,res)=>{
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
//*************************************/
//Inicializando o serviço
app.listen(process.env.PORT, console.log('serviço ativo - http://localhost:'+process.env.PORT))

