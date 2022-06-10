//**************************/
//requisição de modulos

require('dotenv').config()

const expressLayouts = require('express-ejs-layouts')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

//**************************/
//Importando os routers
const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/produtos')

//habilitando as rotas


app.use('/produtos', produtosRouter)
app.use('/pedidos',pedidosRouter)
//**************************/
//Configurando CORS Middleware
app.use(cors())
//Cross-Origin Resource Sharing


//**************************/
//Configurando JSON Middleware
app.use(
    express.urlencoded({
        extended:true,
    }),//essa virgula é?
)
app.use(express.json())

//**************************/
//Configurando View Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout','./layouts/layout')
app.set('views',__dirname+'/views')

//**************************/
//Configurando/Conectando Mongoose

const DB_USER = process.env.DB_USER
const DB_PASS = encodeURIComponent(process.env.DB_PASS)
//const dbName= process.env.DB_NAME

//const Produto = require('./model/Product')

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.fv5if9g.mongodb.net/?retryWrites=true&w=majority`
    ) 
    .then(()=>{
        console.log('conectado ao MongoDB')
    })
    .catch((err)=>console.log(err))
        //console.log("Houve um erro ao se conectar ao mongoDB: "+err)

//app.get('/',(req,res)=>{
//    res.end('servidor ativo')
//})

        
//Importando models
const Usuario = require('./model/User')
const Pedido = require('./model/Order')


//*************************************/
//Inicializando o serviço
app.listen(process.env.PORT, console.log('serviço ativo - http://localhost:'+process.env.PORT))
//o erro está no process.env.PORT

/*
//requisição de modulos
const express = require('express')
const app = express()

//Configurando JSON Middleware
app.use(
    express.urlencoded({
        extended:true,
    }),
)

//Configurando JSON, não é obrigatório mas auxilia
app.use(express.json())

//Configurando Rotas
app.get('/',(req,res)=>{
    res.end('servidor ativo')
})

//Inicializando o serviço
app.listen(3005, console.log('serviço ativo - http://localhost:3005')) 
*/

