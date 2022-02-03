
const express = require('express')

const app = express()
const mongoose = require('mongoose')
const path = require('path')
const pdf = require('html-pdf')
const ejs=  require('ejs')
const bodyParser = require('body-parser')

const handlebars = require('express-handlebars')


require('./models/Receita')
const Receita = mongoose.model('receitas')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}
}))
app.set('view engine' , 'handlebars');

mongoose.Promise = global.Promise;

  mongoose.connect('mongodb://localhost/receitas').then(()=>{
      console.log('Conectado ao Banco de Dados')
  }).catch((err)=>{
    console.log('Error ao conectar no bando de dados em: '+err)
  })

app.get('/', (request , response)=>{
  response.render('index')
})

app.post('/' ,( request , response )=>{
  if(request.body.nome.trim() && 
    request.body.sus.trim() && 
    request.body.endereco.trim() && 
    request.body.remedio.trim() && 
    request.body.quantidade.trim() &&
    request.body.dosagem.trim() && 
    request.body.data.trim())
  {
    const novaReceita = {
      sus: request.body.sus,
      nome: request.body.nome, 
      remedio: request.body.remedio,
      endereco: request.body.endereco, 
      quantidade: request.body.quantidade,
      dosagem: request.body.dosagem,
      data: request.body.data
    }

    new Receita(novaReceita).save().then(()=>{
      console.log('receita salva com sucesso')
      response.redirect('/')
    }).catch((err)=>{
      console.log('erro ao cadastrar receita')
    })
  
  
  }else{
    response.redirect('/')
  }
})


app.get('/listar' , (request , response)=> {
  Receita.find().then((receitas)=>{
    response.render('listar', {receitas:receitas})
  }).catch((err) =>{
    console.log('erro ao lisar receitas')
    response.redirect('/')
  }) 
})


function fdpcreate(PDF){
  pdf.create(PDF).toFile('./meufdp.pdf', (err, res)=>{
    if(err){
      console.log('f')
    }else if(res){
      console.log('tudook')
    }
  })
}

app.get('/pdf/:id' , async(request, response)=>{
 await Receita.findOne({_id: request.params.id}).then((receita)=>{
   
      const PDF = `
      <h1>Nome:${receita.nome}</h1>
      <p>SUS:${receita.sus}</p>
      `
      fdpcreate(PDF)  

  }).catch((err)=>{
    console.log('err ao listar')
    response.redirect('/')
  })
})


app.listen(3000 , ()=>{
  console.log('Conectado com sucesso servidor')
})