const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Receita = new Schema ({
  sus: {
    type: String, 
    required: true
  },
  nome: {
    type: String,
    required: true,
  },
  remedio: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  }, 
  quantidade: {
    type: String, 
    required: true
  },
  dosagem: {
    type: String,
    required: true
  },
  data:{
    type:Date ,
    required: true
  }

})

mongoose.model('receitas' , Receita)



/*
nome 
sus
endereco
remedio
quantidade
dosgem
data*/ 