import express from 'express';
import database from './database.js';
import url from 'url';
import path from 'path';
import fileupload from 'express-fileupload'
import cors from 'cors';
import request from 'request';
import venom from 'venom-bot';
import bcrypt from 'bcryptjs';
import FacebookStrategy from 'passport-facebook';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv'; 

dotenv.config();
const app = express();
var __filename = url.fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

 app.listen(8080, () => console.log('Servidor rodando!'));

 venom
  .create({
    session: 'session-name',
    multidevice: true 
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

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
app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: 'calvo'
   }));
   app.use(passport.initialize());
   app.use(passport.session());
   passport.use(new FacebookStrategy({
       clientID: process.env.CLIENTE_ID,
       clientSecret: process.env.CLIENTE_SECRET,
       callbackURL: "http://localhost:8080/auth/facebook/callback",
       profileFields: ['id', 'displayName', 'photos', 'emails', 'gender']
     },
     function(accessToken, refreshToken, profile, done) {
       process.nextTick(function () {
             return done(null, profile);
       });
     }
   ));

   function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();
    res.redirect('/login');
   }

   passport.serializeUser((user, done) =>{
    done(null, user)
   });
   
   passport.deserializeUser((user,done)=>{
    done(null, user)
   });

   app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
  
   app.get('/auth/facebook/callback',
     passport.authenticate('facebook', { successRedirect : '/verificacao', failureRedirect: '/login' }),
     function(req, res) {
       res.redirect('/');
     });

    app.get('/verificacao', isLoggedIn, async (req, res) => {
        let foto = req.user.photos[0].value;
        let email = req.user.emails[0].value;
        let nome = req.user.displayName;
        let idfacebook = req.user.id;
        let resposta = await database.getLogin(idfacebook);
        if(resposta == ![]){
          let insert = await database.insertUser(nome, "", 0, idfacebook, email, "", foto, 0);
             if(insert.numero =! 0){
                res.redirect('/configuracao');
             }else{res.redirect('/erro')}
        }else{
            res.redirect('/admin');
        }});   
        

     app.get('/logout', (req, res) =>{
        req.logout(function(err){
        if(err) {return next (err);}
        res.redirect('/');
        });
       });

 app.get('/', (req, res) => {
     res.header('Content-Type', 'text/html');
     res.sendFile(__dirname + '/login.html');
 })
 app.get('/login', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/login.html');
})
// app.get('/register', (req, res) => {
//     res.header('Content-Type', 'text/html');
//     res.sendFile(__dirname + '/register.html');
// })
app.get('/inicio', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/inicio.html');
})
app.get('/veiculos', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/veiculos.html');
})
app.get('/cadastro-de-veiculo', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/cadastro-de-veiculo.html');
})
app.get('/historico', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/historico.html');
})
app.get('/agendar', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/agendar.html');
})
app.get('/configuracao', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/configuracao.html');
})
app.get('/admin', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
      res.header('Content-Type', 'text/html');
      res.sendFile(__dirname + '/admin.html');
  }else{
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/adminagendar', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
      res.header('Content-Type', 'text/html');
      res.sendFile(__dirname + '/adminagendar.html');
  }else{
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/vencidos', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
      res.header('Content-Type', 'text/html');
      res.sendFile(__dirname + '/vencidos.html');
  }else{
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/estatistica', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
      res.header('Content-Type', 'text/html');
      res.sendFile(__dirname + '/estatistica.html');
  }else{
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/fidelidade', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
      res.header('Content-Type', 'text/html');
      res.sendFile(__dirname + '/fidelidade.html');
  }else{
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/editagendamento', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/editagendamento.html');
})
app.get('/editagendamentoadmin', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
      res.header('Content-Type', 'text/html');
      res.sendFile(__dirname + '/editagendamentoadmin.html');
  }else{
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }
})
app.get('/car/', isLoggedIn, async(req, res) => {
    res.send(await database.getVeiculos(req.user.id));
})
app.delete('/car/:id', isLoggedIn, async (req, res) => {
    database.deleteVeiculo(req.params.id);
    res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
})
app.post('/car', isLoggedIn, async (req, res) => {
    let {placa, tipo} = req.body;
    let cliente = req.user.id;
    const link = `https://www.fipeplaca.com.br/_next/data/XePhZPTecIOvSkzFrJBhg/placa/${placa}.json?placa=${placa}`;
    request(link, (err, response, html) => {
        if (!err) {
         const json = JSON.parse(html);
         if(json.pageProps.vehicleData.Marca){
         let marca = json.pageProps.vehicleData.Marca;
         let modelo = json.pageProps.vehicleData.Modelo;


         let aux = marca + " " + modelo;
         res.status(201).send(database.insertVeiculo(placa, aux, cliente, tipo));
         }
         else{res.status(201).send(database.insertVeiculo(placa, " ", cliente, tipo));}
        }
      });
    
})
app.get('/agender/', isLoggedIn, async(req, res) => {
    res.send(await database.getAgendamento(req.user.id));
})
app.get('/agenderesp/:pesquisa', isLoggedIn, async(req, res) => {
    res.send(await database.getAgendamentoesp(req.user.id, req.params.pesquisa));
})
app.get('/editagender/:id', isLoggedIn, async(req, res) => {
    res.send(await database.geteditAgendamento(req.params.id, req.user.id));
    
})
app.get('/editagenderadmin/:id', isLoggedIn, async(req, res) => {
  res.send(await database.geteditAgendamentoadmin(req.params.id));
  
})
app.get('/estatisticac', isLoggedIn, async(req, res) => {
  let respostaestatisticac = await database.getestatisticac();
  res.send([{quantidade: respostaestatisticac.length}]);
  
})
app.get('/estatisticatipos', isLoggedIn, async(req, res) => {
  let respostaestatisticatipos = await database.getestatisticatipos();
  res.send([{quantidade: respostaestatisticatipos.length}]);
  
})
app.get('/estatisticatiposs', isLoggedIn, async(req, res) => {
  let respostaestatisticatiposs = await database.getestatisticatiposs();
  res.send([{quantidade: respostaestatisticatiposs.length}]);
  
})
app.get('/estatisticatiposss', isLoggedIn, async(req, res) => {
  let respostaestatisticatiposss = await database.getestatisticatiposss();
  res.send([{quantidade: respostaestatisticatiposss.length}]);
  
})
app.get('/estatisticatipossss', isLoggedIn, async(req, res) => {
  let respostaestatisticatipossss = await database.getestatisticatipossss();
  res.send([{quantidade: respostaestatisticatipossss.length}]);
  
})
app.get('/estatisticaclientes', isLoggedIn, async(req, res) => {
  let estatisticaclientes = await database.getestatisticaclientes();
  if(estatisticaclientes == ![]){
    res.send([{nome: "--", numero: "--"}])
  }else{
    res.send(estatisticaclientes);
  }
  
  
})
app.get('/estatisticacar', isLoggedIn, async(req, res) => {
  let respostaestatisticacar = await database.getestatisticacar();
  res.send([{quantidade: respostaestatisticacar.length}]);
  
})
app.get('/estatisticafides', isLoggedIn, async(req, res) => {
  let respostaestatisticafides = await database.getestatisticafides();
  res.send([{quantidade: respostaestatisticafides.length}]);
  
})
app.get('/estatisticafide', isLoggedIn, async(req, res) => {
  let respostaestatisticafide = await database.getestatisticafide();
  res.send([{quantidade: respostaestatisticafide.length}]);
  
})
app.get('/estatisticaag', isLoggedIn, async(req, res) => {
  let respostaestatisticaag = await database.getestatisticaag();
  res.send([{quantidade: respostaestatisticaag.length}]);
  
})
app.get('/estatisticaags', isLoggedIn, async(req, res) => {
  let respostaestatisticaags = await database.getestatisticaags();
  res.send([{quantidade: respostaestatisticaags.length}]);
  
})
app.get('/estatisticaagsc', isLoggedIn, async(req, res) => {
  let respostaestatisticaagsc = await database.getestatisticaagsc();
  res.send([{quantidade: respostaestatisticaagsc.length}]);
})
app.post('/estatisticaagp', isLoggedIn, async(req, res) => {
  let {vdata, vdata1} = req.body;
  let respostaestatisticaagp = await database.getestatisticaagp(vdata, vdata1);
  res.send([{quantidade: respostaestatisticaagp.length}]);
  
})
app.post('/estatisticaagsp', isLoggedIn, async(req, res) => {
  let {vdata, vdata1} = req.body;
  let respostaestatisticaagsp = await database.getestatisticaagsp(vdata, vdata1);
  res.send([{quantidade: respostaestatisticaagsp.length}]);
  
})
app.post('/estatisticaagscp', isLoggedIn, async(req, res) => {
  let {vdata, vdata1} = req.body;
  let respostaestatisticaagsc = await database.getestatisticaagscp(vdata, vdata1);
  res.send([{quantidade: respostaestatisticaagsc.length}]);
  
})
app.post('/estatisticaclientesp', isLoggedIn, async(req, res) => {
  let {vdata, vdata1} = req.body;
  let estatisticaclientesp = await database.getestatisticaclientesp(vdata, vdata1);
  if(estatisticaclientesp == ![]){
  res.send([{nome: "--", numero: "--"}])
  }else{ res.send(estatisticaclientesp);}
 
  
})
app.get('/agenderadmin/', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getAgendamentoadmin());
}})
app.get('/clientedetalhe/:id', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getClientedetalhe(req.params.id));
}})
app.get('/agenderespadmin/:pesquisa', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getAgendamentoespadmin(req.params.pesquisa));
}})
app.get('/agenderadminhoje/', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getAgendamentoadminhoje());
}})
app.get('/agenderadminamanha/', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getAgendamentoadminamanha());
}})
app.get('/agenderadminvencido/', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getAgendamentoadminvencido());
}})
app.get('/agendamentodetalhe/:ida', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getAgendamentodetalhe(req.params.ida));
}})
app.get('/fidelidades', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    res.send(await database.getFidelidades());
}})
app.put('/fidelidades', isLoggedIn, async(req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
    if(respostaadmin[0].permicao == 1){
    let {idfidelidade} = req.body;
    res.send(await database.putFidelidades(idfidelidade));
}})


app.get('/user/', isLoggedIn, async(req, res) => {
    res.send(await database.getDados(req.user.id));
})

// app.get('/cardetalhe/:id', async(req, res) => {
//     res.send(await database.getVeiculosdetalhe(req.params.id));
// })

// app.post('/user', async (req, res) => {
//     let {nome, telefone, permicao, email, senha, fidelidade} = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(senha, salt);   
//     res.status(201).send(await database.insertUser(nome, telefone, permicao, email, hash, fidelidade));

// })
// app.post('/agender', async (req, res) => {
//     let {fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente} = req.body;
//     res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente));
// })
// app.put('/editagender/:id', async (req, res) => {
//     let {observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente} = req.body;
//     res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente, req.params.id));
// })
// app.delete('/editagender/:id', async (req, res) => {
//     database.deleteAgendamento(req.params.id);
//     res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
// })
app.get('/cardetalhe/:id', isLoggedIn, async(req, res) => {
    let placa = req.params.id;
    const link1 = `https://www.fipeplaca.com.br/_next/data/YKLGFNrXKTCfB2bYV_Pc9/placa/${placa}.json?placa=${placa}`;
    request(link1, (err, response, html) => {
        if (!err) {
         const json1 = JSON.parse(html);
         let marca = json1.pageProps.vehicleData.Marca;
         let modelo = json1.pageProps.vehicleData.Modelo;
         let AnoModelo = json1.pageProps.vehicleData.AnoModelo;
         let Combustivel = json1.pageProps.vehicleData.Combustivel;
         let cilindradas = json1.pageProps.vehicleData.cilindradas;
         let potencia = json1.pageProps.vehicleData.potencia;
         let cor = json1.pageProps.vehicleData.cor;
         let fipe = json1.pageProps.vehicleData.CodigoFipe;
         let ipva = json1.pageProps.vehicleData.ipva;
         let valor = json1.pageProps.vehicleData.Valor;
    res.send([{placa: placa, marca: marca, modelo: modelo, AnoModelo: AnoModelo, Combustivel: Combustivel, cilindradas: cilindradas, potencia: potencia, cor: cor, fipe: fipe, ipva: ipva, valor: valor}]);

}});

})

app.get('/news', async (req, res) => {
  const link = `https://newsdata.io/api/1/news?apikey=pub_9045d02aa3dde8a8642911a1673ef7f21ca9&q=gasolina%20OR%20ipva%20OR%20carros%20OR%20automóveis%20OR%20motor&language=pt`;
  request(link, (err, response, html) => {
      if (!err) {
      
       const json1 = JSON.parse(html);
       res.send(json1.results);       
      

}
      }
    );
  
})

// app.post('/login', async (req, res) => {
//     let {email, senha} = req.body;
//     let resposta = await database.getLogin(email);
//     if(bcrypt.compareSync(senha, resposta[0].senha)){
//         var hash1 = bcrypt.hashSync(resposta[0].nome, 8);
//         await database.setLogin(email, hash1);
//         res.send(await database.getLoginsession(email));
        

    
//     }else{console.log("diferente");}
// })

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

    app.post('/agender', isLoggedIn, async (req, res) => {
        let {fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, placao} = req.body;
        let respostatel = await database.getLogin(req.user.id);
         if(respostatel.telefone == ""){
             res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id));
         }else{
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number1 = "55" + respostatel[0].telefone + "@c.us";
        let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase()  + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        client.sendText(number1, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id));
    
}})
    app.delete('/editagender/:id', isLoggedIn, async (req, res) => {
        let {vdata, placa} = req.body;
        let respostatel1 = await database.getLogin(req.user.id);
        if(respostatel1[0].telefone == ""){
            database.deleteAgendamento(req.params.id);
            res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
        }else{
        database.deleteAgendamento(req.params.id);
        res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
        let number = "55" + respostatel1[0].telefone + "@c.us";
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let menssage = "❌ *CANCELAMENTO!*\n\nPlaca: " + placa.toUpperCase()  + "\nData: " + datamesmo + "\n_id do agendamento: " + req.params.id + "_\n\nSe você não for a pessoa que fez a solicitação, entre em contato conosco!";
        client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
}})
app.delete('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
  let respostaag = await database.getAgendamentocomcliente(req.params.id);
  if(respostaag[0].telefone == ""){
      database.deleteAgendamento(req.params.id);
      res.send('Agendamento com o id: ' + req.params.id + ' deletado com sucesso')
  }else{
  database.deleteAgendamento(req.params.id);
  res.send('Agendamento com o id: ' + req.params.id + ' deletado com sucesso')
  let number = "55" + respostaag[0].telefone + "@c.us";
  let gdata = respostaag[0].data.split("T");
  let hora = gdata[1];
  let auxdata = gdata[0].split("-");
  let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
  let menssage = "😥 *QUE PENA!*\nVocê não compareceu ao agendamento marcado para o dia " + datamesmo + " do veículo com placa: " + respostaag[0].placa.toUpperCase() + "\n\nPara remarcar entre em contato conosco!";
  client.sendText(number, menssage)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
}})
app.post('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
  let {observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km} = req.body;
  let nomerealzaozao = "";
  let respostac = await database.getAgendamentocomcliente(req.params.id);
  if (req.files) {
  var file = req.files.foto;
  var filename = file.name;
  var nome = filename.split(".");
  var nomerealzao = nome[1];
  nomerealzaozao = req.params.id + respostac[0].sessionid + "." + nomerealzao; 

  file.mv('./site/img/agend/' + nomerealzaozao, function (err) {
  if(err){
      res.send(err)
  }
  else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/sucesso.html');
  }
  })}

  if(respostac[0].telefone == ""){
    let respostaultimo = await database.getUltimo(respostac[0].sessionid, respostac[0].placa);
      if(respostaultimo == ![]){
      database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id); 
      database.insertUltimo(respostac[0].sessionid, respostac[0].placa);
      }else{
        database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id); 
        database.putUltimo(respostaultimo[0].id);
      }
  }else{
    let respostaultimo = await database.getUltimo(respostac[0].sessionid, respostac[0].placa);
      if(respostaultimo == ![]){
        database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id); 
        database.insertUltimo(respostac[0].sessionid, respostac[0].placa);
      }else{
        database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id); 
        database.putUltimo(respostaultimo[0].id);
      }
  let number = "55" + respostac[0].telefone + "@c.us";
  let menssage = "🔧 *SERVIÇO CONCLUÍDO!*\n\nPode vir retirar seu carro " + respostac[0].modelo + ", ele já está novinho em folha!\n\nPara verificar os detalhes da troca acesse: meucarro.com.br/historico";
  client.sendText(number, menssage)
  .then((result) => {
    console.log('Result: ', result); //return object success
   })
  }})
    app.put('/editagender/:id', isLoggedIn, async (req, res) => {
        let respostatel2 = await database.getLogin(req.user.id);
        let {observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, placao} = req.body;
        if(respostatel2[0].telefone == ""){
        res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id, req.params.id));
        }else{
        res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id, req.params.id));
        let number = "55" + respostatel2[0].telefone + "@c.us";
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let menssage = "⚠️ *AGENDAMENTO ALTERADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase()  + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
}})
    app.put('/user/', isLoggedIn, async (req, res) => {
        let {nome, telefone, email, foto, endereco} = req.body;
        if(telefone == ""){res.status(201).send(await database.editUser(nome, telefone, email, foto, endereco, req.user.id));
        }else{
            res.status(201).send(await database.editUser(nome, telefone, email, foto, endereco, req.user.id))    
            let number = "55" + telefone + "@c.us";
            let menssage = "🚗 *SEJA BEM VINDO(A) " + nome.toUpperCase() + "!*\n\nNós da Meu Carro agradecemos por você utilizar nosso serviço...\n\nPara mais informações acesse: www.meucarro.com.br/suporte";
            client.sendText(number, menssage)
            .then((result) => {
              console.log('Result: ', result); //return object success
            })    
        }
        
    })
    app.post('/present', isLoggedIn, async (req, res) => {
      let respostagif = await database.getLogin(req.user.id);
      if(respostagif[0].fidelidade == 5){
        let verificarfidelidade = await database.getFidelidade(req.user.id);
          if(verificarfidelidade == ![]){
          let auxgift = Math.floor(Math.random() * 999999) + 100000;
          database.insertFidelidade(req.user.id, auxgift, 0);
          let menssage = "🎁 *PARABÉNS VOCÊ GANHOU!*\n\nPara reinvindicar seu prêmio vá até a nossa loja e utilize o código abaixo:\n\n*" + auxgift + "*";
          let number = "55" + respostagif[0].telefone + "@c.us"; 
          client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
          res.send([{cod: auxgift}]);
          }else{
            res.send([{cod: verificarfidelidade[0].cupom}]);
          }
      }
    
    })
    app.post('/aviso/', isLoggedIn, async (req, res) => {
      let {idag} = req.body;
      let respostaaviso = await database.getaviso(idag);
      let gdata = respostaaviso[0].data.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        res.send(database.alteraraviso(idag));
          let menssage = "📢 *NÃO VÁ ESQUECER HEIN*\nVocê tem um agendamento marcado conosco:\n\nDia " + datamesmo + "\n\nSó trazer o " + respostaaviso[0].modelo + " (_" + respostaaviso[0].placa + "_) para Rua Manoel Estevão, 431 - Centro - União da Vitória." ;
          let number = "55" + respostaaviso[0].telefone + "@c.us"; 
          client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
      })
      app.put('/vencidos/', isLoggedIn, async (req, res) => {
        let {idvencido} = req.body;
        let respostavencido = await database.getvencido(idvencido);
          res.send(database.alterarvencido(idvencido));
            let menssage = "📅 *FAZ UM TEMPINHO!*\n\n Que você não aparece para trocar o óleo do carro: " + respostavencido[0].modelo + " - " + respostavencido[0].placa.toUpperCase() + "\n\n Agende sua troca conosco para preservar a vida útil do seu motor!";
            let number = "55" + respostavencido[0].telefone + "@c.us"; 
            client.sendText(number, menssage)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
        })
        app.post('/adminagendar/', isLoggedIn, async(req, res) => {
          let {observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, placao, email, nome, telefone, endereco, tipo} = req.body;
          let respostaadmin = await database.getLogin(req.user.id);
            if(respostaadmin[0].permicao == 1){
              console.log("entrou aqui");
            let verificacadastro = await database.getClientecomemail(email);
                if(verificacadastro == ![]){
                  console.log("entrou aqui1");
                database.insertCliente(email, telefone, endereco, nome, 0, 0, "");
                console.log("entrou aqui2");
                //const link = `https://www.fipeplaca.com.br/_next/data/YKLGFNrXKTCfB2bYV_Pc9/placa/${placao}.json?placa=${placao}`;
                //let numeroplaca = request(link, (err, response, html) => {
                // if (!err) {
                // const json = JSON.parse(html);     
                // let marca = json.pageProps.vehicleData.Marca;
                // let modelo = json.pageProps.vehicleData.Modelo;
        
                // let aux = marca + " " + modelo;
                 let numeroplaca = await database.insertVeiculo(placao, "aux", email, tipo);
                
                database.insertAgendamento(numeroplaca.numero, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, email); 
                let gdata = vdata.split("T");
              let hora = gdata[1];
              let auxdata = gdata[0].split("-");
              let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
              let number1 = "55" + telefone + "@c.us";
              let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase()  + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
              client.sendText(number1, menssage)
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              }else{
                let verificaveiculo = await database.getVeiculo(verificacadastro[0].sessionid, placao);
                if(verificaveiculo == ![]){
                  let numeroplaca1 = await database.insertVeiculo(placao, "aux", verificacadastro[0].sessionid, tipo);
                  database.insertAgendamento(numeroplaca1.numero, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, verificacadastro[0].sessionid); 
                }else{
                  database.insertAgendamento(verificaveiculo[0].id, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, verificacadastro[0].sessionid); 
                }
              }if(verificacadastro[0].telefone != ""){
              let gdata = vdata.split("T");
              let hora = gdata[1];
              let auxdata = gdata[0].split("-");
              let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
              let number1 = "55" + verificacadastro[0].telefone + "@c.us";
              let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase()  + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
              client.sendText(number1, menssage)
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
}}})
  
    // client.onMessage((message) => {
    //   if (message.body === 'oi' && message.isGroupMsg === false) {
    //     client
    //       .sendText(message.from, 'bot do douglas 🕷')
    //       .then((result) => {
    //         console.log('Result: ', result); //return object success
    //       })
    //       .catch((erro) => {
    //         console.error('Error when sending: ', erro); //return object error
    //       });
    //   }
    // });
}
// app.get('/gift/', isLoggedIn, async (req, res) => {
//   let respostagif = await database.getLogin(req.user.id);
//   if(respostagif[0].fidelidade == 5){
//     let verificarfidelidade = await database.getFidelidade(req.user.id);
//       if(verificarfidelidade == ![]){
//       let auxgift = Math.floor(Math.random() * 999999) + 100000;
//       database.insertFidelidade(req.user.id, auxgift, 0);
//       res.send([{cod: auxgift}]);
//       let menssage = "🎁 *PARABÉNS VOCÊ GANHOU!*\n\nPara reinvindicar seu prêmio vá até a nossa loja e utilize o código abaixo:\n\n*" + auxgift + "*";
//       let number = "55" + respostagif[0].telefone + "@c.us"; 
//       client.sendText(number, menssage)
//             .then((result) => {
//               console.log('Result: ', result); //return object success
//             })    
//       }else{
//         res.send([{cod: verificarfidelidade[0].cupom}]);
//       }
//   }

// })

app.get('*', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
})