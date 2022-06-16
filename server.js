import express from 'express';
import database from './database.js';
import url from 'url';
import path from 'path';
import fileupload from 'express-fileupload'
import cors from 'cors';
import request from 'request';
import venom from 'venom-bot';

const app = express();
var __filename = url.fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

 app.listen(8080, () => console.log('Servidor rodando!'));

//  venom
//   .create({
//     session: 'session-name', //name of session
//     multidevice: true // for version not multidevice use false.(default: true)
//   })
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });

app.use((req, res, next) => {
    console.log(req.url);
    next();
})
app.use(fileupload());
app.use(express.json());
app.use(express.static('site/css'));
app.use(express.static('site/js'));
app.use(express.static('site/img'));
app.use(cors());

 app.get('/', (req, res) => {
     res.header('Content-Type', 'text/html');
     res.sendFile(__dirname + '/index.html');
 })
 app.get('/login', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/login.html');
})
app.get('/register', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/register.html');
})
app.get('/inicio', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/inicio.html');
})
app.get('/veiculos', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/veiculos.html');
})
app.get('/cadastro-de-veiculo', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/cadastro-de-veiculo.html');
})
app.get('/historico', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/historico.html');
})
app.get('/agendar', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/agendar.html');
})
app.get('/configuracao', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/configuracao.html');
})
app.get('/admin', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin.html');
})
app.get('/editagendamento', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/editagendamento.html');
})

app.get('/car/:id', async(req, res) => {
    res.send(await database.getVeiculos(req.params.id));
})
app.delete('/car/:id', async (req, res) => {
    database.deleteVeiculo(req.params.id);
    res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
})
app.post('/car', async (req, res) => {
    let {placa, tipo, cliente} = req.body;
    const link = `https://www.fipeplaca.com.br/_next/data/WGPJkdDfWv_2lHAboCzpJ/placa/${placa}.json?placa=${placa}`;
    request(link, (err, response, html) => {
        if (!err) {
         const json = JSON.parse(html);
         if(json.pageProps.vehicleData.Marca){
         let marca = json.pageProps.vehicleData.Marca;
         let modelo = json.pageProps.vehicleData.Modelo;
         let AnoModelo = json.pageProps.vehicleData.AnoModelo;
         let Combustivel = json.pageProps.vehicleData.Combustivel;
         let cilindradas = json.pageProps.vehicleData.cilindradas;
         let potencia = json.pageProps.vehicleData.potencia;
         let cor = json.pageProps.vehicleData.cor;

         let aux = marca + " " + modelo;
         res.status(201).send(database.insertVeiculo(placa, aux, cliente, tipo, AnoModelo, Combustivel, cilindradas, potencia, cor));
         }
         else{res.status(201).send(database.insertVeiculo(placa, " ", cliente, tipo, "", "", "", "", ""));}
        }
      });
    
})
app.get('/agender/:id', async(req, res) => {
    res.send(await database.getAgendamento(req.params.id));
})
app.get('/editagender/:id', async(req, res) => {
    res.send(await database.geteditAgendamento(req.params.id));
})
app.get('/agenderadmin/', async(req, res) => {
    res.send(await database.getAgendamentoadmin(req.params.id));
})
app.get('/user/:id', async(req, res) => {
    res.send(await database.getDados(req.params.id));
})
app.put('/user/:id', async (req, res) => {
    let {nome, telefone, email, foto, endereco} = req.body;
    res.status(201).send(await database.editUser(nome, telefone, email, foto, endereco, req.params.id));
})
app.post('/user', async (req, res) => {
    let {nome, telefone, permicao, email, senha, fidelidade} = req.body;
    res.status(201).send(await database.insertUser(nome, telefone, permicao, email, senha, fidelidade));
})
// app.post('/agender', async (req, res) => {
//     let {fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente} = req.body;
//     res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente));
// })
app.put('/editagender/:id', async (req, res) => {
    let {observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente} = req.body;
    res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente, req.params.id));
})
// app.delete('/editagender/:id', async (req, res) => {
//     database.deleteAgendamento(req.params.id);
//     res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
// })
app.get('/cardetalhe/:id', async(req, res) => {
    res.send(await database.getVeiculosdetalhe(req.params.id));
})



//  app.get('/produtos', async(req, res) => {
//     res.send(await database.getProdutos());
// })
// app.get('/produt/:id', async(req, res) => {
//     res.send(await database.getProdutosSelecionado(req.params.id));
// })


// app.delete('/produtos/:id', async (req, res) => {
//     database.deleteProduto(req.params.id);
//     res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
// })

// app.post('/produtos', async (req, res) => {
//     let {titulo, descricao, img, preco} = req.body;
//     res.status(201).send(await database.insertProduto(titulo, descricao, img, preco));
// })

// app.put('/produtos/:id', async (req, res) => {
//     let {titulo, descricao, img, preco} = req.body;
//     res.status(201).send(await database.editProduto(titulo, descricao, img, preco, req.params.id));
// })
// app.get("/post/:placa", (req, res) => {
//     const { placa } = req?.params;
//     if (placa) {
//         const link = `https://www.fipeplaca.com.br/_next/data/WGPJkdDfWv_2lHAboCzpJ/placa/${placa}.json?placa=${placa}`;
//         request(link, (err, response, html) => {
//             if (!err) {
//               const json = JSON.parse(html);
//              let marca = json.pageProps.vehicleData.Marca;
//              let modelo = json.pageProps.vehicleData.Modelo;
//              let aux = marca + modelo;
//               console.log(aux);  
//     }
//   });
// }})

function start(client) {

    app.post('/agender', async (req, res) => {
        let {fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente, telefone, placao} = req.body;
        res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente));
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number = "55" + telefone + "@c.us";
       let menssage = "*AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase()  + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara editar ou cancelar agendamento acesse: meucarro.com.br/editagendamento?id=" + fk_placa;
        client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
    
    })
    app.delete('/editagender/:id', async (req, res) => {
        let {telefone} = req.body;
        database.deleteAgendamento(req.params.id);
        res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
        client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
    })


    client.onMessage((message) => {
      if (message.body === 'oi' && message.isGroupMsg === false) {
        client
          .sendText(message.from, 'bot do douglas 🕷')
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
          .catch((erro) => {
            console.error('Error when sending: ', erro); //return object error
          });
      }
    });
  }