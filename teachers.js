//Como o arquivo de rotas está ficando muit grande devido funções de validação, por exemplo. Criamos este arquivo para exportar funções de 'create', 'update' e 'delete'por exmplo.
//Normalmente usamos o:
// module.exports = var, [], {}, function

const fs = require('fs') //(1)
const data = require('./data.json') //(2)
//create
exports.post = function(req, res) {
  const keys = Object.keys(req.body)// O constructor Object irá pegar as chaves do objetos
  // do rq.body

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Por favor, preencha todos os campos.')
    }
  }
  
  //Observe que toda vez sobrescrevemos os dados do objeto no data.json
  //então criaremos uma chave chamada teachers dentro do data.json gerando um array(2)
  data.teachers.push(req.body) // adcionamos objetos dentro do array
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write file error')
    return res.redirect('/teachers')
  } ) // perceba que estamos criando na raiz do projeto um arquivo data que armazenará os dados vindos do Front, mas temos que converter em notação JSON através de um constructor JSON e por fim usamos uma CAllBACK function para não bloquear a aplicação. 
  //Formatar as visualizações no dta.json stringifi

  // return res.send(req.body)
}

//como guardar a informação que vem do body?
// usamos a lib 'fs' - filesystem do Node (1)