//******************************/
//requisição de modulos
const express = require('express')
const app = express()
//******************************/
//Configurando JSON Middleware
app.use(
    express.urlencoded({
        extended:true,
    }),
)
app.use(express.json())
//******************************/
//Configurando Rotas
app.get('/',(req,res)=>{
    res.json({msg:'Servidor ativo'})
})
//******************************/
//Inicializando o serviço
app.listen(3005, console.log('serviço ativo - http://localhost:3005'))