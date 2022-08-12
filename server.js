import express from 'express';
import database from './database.js';
import url from 'url';
import path from 'path';
import fileupload from 'express-fileupload'
import cors from 'cors';
import request from 'request';
import venom from 'venom-bot';
import FacebookStrategy from 'passport-facebook';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import puppeteer from 'puppeteer';

dotenv.config();
const app = express();
var __filename = url.fileURLToPath(
  import.meta.url);
var __dirname = path.dirname(__filename) + "/views";

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
app.use(express.static('assets/css'));
app.use(express.static('assets/js'));
app.use(express.static('assets/img'));
app.use(cors());
app.use(session({
  resave: false,
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
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

//Autenticação com o Facebook

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/verificacao',
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/verificacao', isLoggedIn, async (req, res) => {
  let foto = req.user.photos[0].value;
  let email = req.user.emails[0].value;
  let nome = req.user.displayName;
  let idfacebook = req.user.id;
  let resposta = await database.getLogin(idfacebook);
  if (resposta == ![]) {
    let respostaemail = await database.getLogin(email);
    if (respostaemail == ![]) {
      let insert = await database.insertUser(idfacebook, nome, "", 0, email, "", foto, 0);
      if (insert.numero = !0) {
        res.redirect('/configuracao');
      } else {
        res.redirect('/erro')
      }
    } else {
      await database.setLogin(idfacebook, respostaemail[0].id_cliente);
      await database.setCarro(idfacebook, respostaemail[0].id_cliente)
      await database.setAg(idfacebook, respostaemail[0].id_cliente);
      res.redirect('/configuracao');
    }
  } else {
    res.redirect('/inicio');
  }
});

app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

//Renderização das páginas dos clientes.

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(__dirname + '/index.html');
})
app.get('/login', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(__dirname + '/login.html');
})

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
  res.sendFile(__dirname + '/cadastrar.html');
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
app.get('/editagendamento', isLoggedIn, (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(__dirname + '/editar.html');
})

//Renderização das páginas dos Administradores com verificação.

app.get('/admin', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin.html');
  } else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/adminagendar', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin-agendar.html');
  } else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/vencidos', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin-vencidos.html');
  } else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/estatistica', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin-estatistica.html');
  } else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/fidelidade', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin-fidelidade.html');
  } else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }

})
app.get('/editagendamentoadmin', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/admin-editar.html');
  } else {
    res.header('Content-Type', 'text/html');
    res.sendFile(__dirname + '/erro.html');
  }
})

//Chamadas e envio de dados dos Clientes.

app.get('/car/', isLoggedIn, async (req, res) => {
  res.send(await database.getVeiculos(req.user.id));
})
app.delete('/car/:id', isLoggedIn, async (req, res) => {
  database.deleteVeiculo(req.params.id);
  res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
})
app.post('/car', isLoggedIn, async (req, res) => {
  let {
    placa,
    tipo
  } = req.body;
  let cliente = req.user.id;
  let respostarobo = await robo(placa);
  let aux = respostarobo.marca + " " + respostarobo.modelo;
  res.status(201).send(database.insertVeiculo(placa, aux, cliente, tipo));
});
app.get('/agender/', isLoggedIn, async (req, res) => {
  res.send(await database.getAgendamento(req.user.id));
})
app.get('/agenderesp/:pesquisa', isLoggedIn, async (req, res) => {
  res.send(await database.getAgendamentoesp(req.user.id, req.params.pesquisa));
})
app.get('/editagender/:id', isLoggedIn, async (req, res) => {
  res.send(await database.geteditAgendamento(req.params.id, req.user.id));

})

//Chamadas e envio de dados dos Administradores.

app.get('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  res.send(await database.geteditAgendamentoadmin(req.params.id));

}})
app.get('/estatisticac', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticac = await database.getestatisticac();
  res.send([{
    quantidade: respostaestatisticac.length
  }]);
  }
})
app.get('/estatisticatipos', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticatipos = await database.getestatisticatipos();
  res.send([{
    quantidade: respostaestatisticatipos.length
  }]);

}})
app.get('/estatisticatiposs', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticatiposs = await database.getestatisticatiposs();
  res.send([{
    quantidade: respostaestatisticatiposs.length
  }]);

}})
app.get('/estatisticatiposss', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticatiposss = await database.getestatisticatiposss();
  res.send([{
    quantidade: respostaestatisticatiposss.length
  }]);

}})
app.get('/estatisticatipossss', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticatipossss = await database.getestatisticatipossss();
  res.send([{
    quantidade: respostaestatisticatipossss.length
  }]);

}})
app.get('/estatisticaclientes', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let estatisticaclientes = await database.getestatisticaclientes();
  if (estatisticaclientes == ![]) {
    res.send([{
      nome: "--",
      numero: "--"
    }])
  } else {
    res.send(estatisticaclientes);
  }
}})
app.get('/estatisticacar', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticacar = await database.getestatisticacar();
  res.send([{
    quantidade: respostaestatisticacar.length
  }]);

}})
app.get('/estatisticafides', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticafides = await database.getestatisticafides();
  res.send([{
    quantidade: respostaestatisticafides.length
  }]);

}})
app.get('/estatisticafide', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticafide = await database.getestatisticafide();
  res.send([{
    quantidade: respostaestatisticafide.length
  }]);

}})
app.get('/estatisticaag', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticaag = await database.getestatisticaag();
  res.send([{
    quantidade: respostaestatisticaag.length
  }]);

}})
app.get('/estatisticaags', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticaags = await database.getestatisticaags();
  res.send([{
    quantidade: respostaestatisticaags.length
  }]);

}})
app.get('/estatisticaagsc', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticaagsc = await database.getestatisticaagsc();
  res.send([{
    quantidade: respostaestatisticaagsc.length
  }]);
}})
app.post('/estatisticaagp', isLoggedIn, async (req, res) => {
  let {
    vdata,
    vdata1
  } = req.body;
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticaagp = await database.getestatisticaagp(vdata, vdata1);
  res.send([{
    quantidade: respostaestatisticaagp.length
  }]);

}})
app.post('/estatisticaagsp', isLoggedIn, async (req, res) => {
  let {
    vdata,
    vdata1
  } = req.body;
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticaagsp = await database.getestatisticaagsp(vdata, vdata1);
  res.send([{
    quantidade: respostaestatisticaagsp.length
  }]);

}})
app.post('/estatisticaagscp', isLoggedIn, async (req, res) => {
  let {
    vdata,
    vdata1
  } = req.body;
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let respostaestatisticaagsc = await database.getestatisticaagscp(vdata, vdata1);
  res.send([{
    quantidade: respostaestatisticaagsc.length
  }]);

}})
app.post('/estatisticaclientesp', isLoggedIn, async (req, res) => {
  let {
    vdata,
    vdata1
  } = req.body;
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
  let estatisticaclientesp = await database.getestatisticaclientesp(vdata, vdata1);
  if (estatisticaclientesp == ![]) {
    res.send([{
      nome: "--",
      numero: "--"
    }])
  } else {
    res.send(estatisticaclientesp);
  }


}})
app.get('/agenderadmin/', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getAgendamentoadmin());
  }
})
app.get('/clientedetalhe/:id', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getClientedetalhe(req.params.id));
  }
})
app.get('/agenderespadmin/:pesquisa', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getAgendamentoespadmin(req.params.pesquisa));
  }
})
app.get('/agenderadminhoje/', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getAgendamentoadminhoje());
  }
})
app.get('/agenderadminamanha/', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getAgendamentoadminamanha());
  }
})
app.get('/agenderadminvencido/', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getAgendamentoadminvencido());
  }
})
app.get('/agendamentodetalhe/:ida', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getAgendamentodetalhe(req.params.ida));
  }
})
app.get('/fidelidades', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    res.send(await database.getFidelidades());
  }
})
app.put('/fidelidades', isLoggedIn, async (req, res) => {
  let respostaadmin = await database.getLogin(req.user.id);
  if (respostaadmin[0].permissao == 1) {
    let {
      idfidelidade
    } = req.body;
    res.send(await database.putFidelidades(idfidelidade));
  }
})
app.get('/user/', isLoggedIn, async (req, res) => {
  res.send(await database.getDados(req.user.id));
})

app.get('/cardetalhe/:id', isLoggedIn, async (req, res) => {
  let placa = req.params.id;
  let respostarobo = await robo(placa);
  res.send([{
    placa: placa,
    marca: respostarobo.marca,
    modelo: respostarobo.modelo,
    AnoModelo: respostarobo.AnoModelo,
    Combustivel: respostarobo.Combustivel,
    cilindradas: respostarobo.cilindradas,
    potencia: respostarobo.potencia,
    cor: respostarobo.cor,
    fipe: respostarobo.fipe,
    ipva: respostarobo.ipva,
    valor: respostarobo.valor,
    logo: respostarobo.logo
  }]);

});

//Request das noticias para a página "inicio".

app.get('/news', async (req, res) => {
  const link = `https://newsdata.io/api/1/news?apikey=pub_9045d02aa3dde8a8642911a1673ef7f21ca9&q=gasolina%20OR%20ipva%20OR%20carros%20OR%20automóveis%20OR%20motor&language=pt`;
  request(link, (err, response, html) => {
    if (!err) {
      const json1 = JSON.parse(html);
      res.send(json1.results);

    }
  });

})

//Função para envio das mensagens no WhatsApp.

function start(client) {

  app.post('/agender', isLoggedIn, async (req, res) => {
    let {
      fk_placa,
      observacao,
      oleo,
      filtro_oleo,
      filtro_ar,
      filtro_arcondicionado,
      filtro_gasolina,
      filtro_hidraulico,
      filtro_racor,
      vdata,
      placao
    } = req.body;
    let respostatel = await database.getLogin(req.user.id);
    if (respostatel.telefone == "") {
      res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id));
    } else {
      let gdata = vdata.split("T");
      let hora = gdata[1];
      let auxdata = gdata[0].split("-");
      let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
      let number1 = "55" + respostatel[0].telefone + "@c.us";
      let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
      client.sendText(number1, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
      res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id));

    }
  })
  app.delete('/editagender/:id', isLoggedIn, async (req, res) => {
    let {
      vdata,
      placa
    } = req.body;
    let respostatel1 = await database.getLogin(req.user.id);
    if (respostatel1[0].telefone == "") {
      database.deleteAgendamento(req.params.id);
      res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
    } else {
      database.deleteAgendamento(req.params.id);
      res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
      let number = "55" + respostatel1[0].telefone + "@c.us";
      let gdata = vdata.split("T");
      let hora = gdata[1];
      let auxdata = gdata[0].split("-");
      let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
      let menssage = "❌ *CANCELAMENTO!*\n\nPlaca: " + placa.toUpperCase() + "\nData: " + datamesmo + "\n_id do agendamento: " + req.params.id + "_\n\nSe você não for a pessoa que fez a solicitação, entre em contato conosco!";
      client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
    }
  })
  app.delete('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
    let respostaag = await database.getAgendamentocomcliente(req.params.id);
    if (respostaag[0].telefone == "") {
      database.deleteAgendamento(req.params.id);
      res.send('Agendamento com o id: ' + req.params.id + ' deletado com sucesso')
    } else {
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
    }
  })
  app.post('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
    let {
      observacao,
      oleo,
      filtro_oleo,
      filtro_ar,
      filtro_arcondicionado,
      filtro_gasolina,
      filtro_hidraulico,
      filtro_racor,
      km
    } = req.body;
    let nomerealzaozao = "";
    let respostac = await database.getAgendamentocomcliente(req.params.id);
    if (req.files) {
      var file = req.files.foto;
      var filename = file.name;
      var nome = filename.split(".");
      var nomerealzao = nome[1];
      nomerealzaozao = req.params.id + respostac[0].id_cliente + "." + nomerealzao;

      file.mv('./assets/img/agend/' + nomerealzaozao, function (err) {
        if (err) {
          res.send(err)
        } else {
          res.header('Content-Type', 'text/html');
          res.sendFile(__dirname + '/sucesso.html');
        }
      })
    }

    if (respostac[0].telefone == "") {
        database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id);
    } else {
        database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id);
      
      let number = "55" + respostac[0].telefone + "@c.us";
      let menssage = "🔧 *SERVIÇO CONCLUÍDO!*\n\nPode vir retirar seu carro " + respostac[0].modelo + ", ele já está novinho em folha!\n\nPara verificar os detalhes da troca acesse: meucarro.com.br/historico";
      client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
    }
  })
  app.put('/editagender/:id', isLoggedIn, async (req, res) => {
    let respostatel2 = await database.getLogin(req.user.id);
    let {
      observacao,
      oleo,
      filtro_oleo,
      filtro_ar,
      filtro_arcondicionado,
      filtro_gasolina,
      filtro_hidraulico,
      filtro_racor,
      vdata,
      placao
    } = req.body;
    if (respostatel2[0].telefone == "") {
      res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id, req.params.id));
    } else {
      res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id, req.params.id));
      let number = "55" + respostatel2[0].telefone + "@c.us";
      let gdata = vdata.split("T");
      let hora = gdata[1];
      let auxdata = gdata[0].split("-");
      let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
      let menssage = "⚠️ *AGENDAMENTO ALTERADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
      client.sendText(number, menssage)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
    }
  })
  app.put('/user/', isLoggedIn, async (req, res) => {
    let {
      nome,
      telefone,
      email,
      foto,
      endereco
    } = req.body;
    if (telefone == "") {
      res.status(201).send(await database.editUser(nome, telefone, email, foto, endereco, req.user.id));
    } else {
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
    if (respostagif[0].qtd_fidelidade >= 5) {
      let verificarfidelidade = await database.getFidelidade(req.user.id);
      if (verificarfidelidade == ![]) {
        let auxgift = Math.floor(Math.random() * 999999) + 100000;
        database.insertFidelidade(req.user.id, auxgift, 0);
        let menssage = "🎁 *PARABÉNS VOCÊ GANHOU!*\n\nPara reinvindicar seu prêmio vá até a nossa loja e utilize o código abaixo:\n\n*" + auxgift + "*";
        let number = "55" + respostagif[0].telefone + "@c.us";
        client.sendText(number, menssage)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
        res.send([{
          cod: auxgift
        }]);
      } else {
        res.send([{
          cod: verificarfidelidade[0].cupom
        }]);
      }
    }

  })
  app.post('/aviso/', isLoggedIn, async (req, res) => {
    let {
      idag
    } = req.body;
    let respostaaviso = await database.getaviso(idag);
    let gdata = respostaaviso[0].data.split("T");
    let hora = gdata[1];
    let auxdata = gdata[0].split("-");
    let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
    res.send(database.alteraraviso(idag));
    let menssage = "📢 *NÃO VÁ ESQUECER HEIN*\nVocê tem um agendamento marcado conosco:\n\nDia " + datamesmo + "\n\nSó trazer o " + respostaaviso[0].placa + " para Rua Manoel Estevão, 431 - Centro - União da Vitória.";
    let number = "55" + respostaaviso[0].telefone + "@c.us";
    client.sendText(number, menssage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
  })
  app.put('/vencidos/', isLoggedIn, async (req, res) => {
    let {
      idvencido
    } = req.body;
    let respostavencido = await database.getvencido(idvencido);
    res.send(database.alterarvencido(idvencido));
    let menssage = "📅 *FAZ UM TEMPINHO!*\n\n Que você não aparece para trocar o óleo do carro: " + respostavencido[0].modelo + " - " + respostavencido[0].placa.toUpperCase() + "\n\n Agende sua troca conosco para preservar a vida útil do seu motor!";
    let number = "55" + respostavencido[0].telefone + "@c.us";
    client.sendText(number, menssage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
  })
  app.post('/adminagendar/', isLoggedIn, async (req, res) => {
    let {
      observacao,
      oleo,
      filtro_oleo,
      filtro_ar,
      filtro_arcondicionado,
      filtro_gasolina,
      filtro_hidraulico,
      filtro_racor,
      vdata,
      placao,
      email,
      nome,
      telefone,
      endereco,
      tipo
    } = req.body;
    let respostaadmin = await database.getLogin(req.user.id);
    if (respostaadmin[0].permissao == 1) {
      let verificacadastro = await database.getClientecomemail(email);
      let respostarobo = await robo(placao);
      if (verificacadastro == ![]) {
        database.insertCliente(email, telefone, endereco, nome, 0, 0, "");
        let aux = respostarobo.marca + " " + respostarobo.modelo;
        let numeroplaca = await database.insertVeiculo(placao, aux, email, tipo);

        database.insertAgendamento(numeroplaca.numero, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, email);
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number1 = "55" + telefone + "@c.us";
        let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        client.sendText(number1, menssage)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
      } else {
        let verificaveiculo = await database.getVeiculo(verificacadastro[0].id_cliente, placao);
        if (verificaveiculo == ![]) {
          let numeroplaca1 = await database.insertVeiculo(placao, aux, verificacadastro[0].id_cliente, tipo);
          database.insertAgendamento(numeroplaca1.numero, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, verificacadastro[0].id_cliente);
        } else {
          database.insertAgendamento(verificaveiculo[0].id, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, verificacadastro[0].id_cliente);
        }
      }
      if (verificacadastro[0].telefone != "") {
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number1 = "55" + verificacadastro[0].telefone + "@c.us";
        let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        client.sendText(number1, menssage)
          .then((result) => {
            console.log('Result: ', result); //return object success
          })
      }
    }
  })

}

//Função para retornar dados das Placas.

async function robo(placa) {
  var regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
  if (placa.match(regex)) {
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0');
    await page.setViewport({
      width: 1280,
      height: 1800
    })
    await page.goto("https://www.tabelafipebrasil.com/placa/" + placa);
    const resultado = await page.evaluate(() => {
      let rmarca = document.querySelectorAll("td")[1].textContent;
      let rmodelo = document.querySelectorAll("td")[3].textContent;
      let rAnoModelo = document.querySelectorAll("td")[5].textContent;
      let rcor = document.querySelectorAll("td")[9].textContent;
      let rcilindradas = document.querySelectorAll("td")[11].textContent;
      let rpotencia = document.querySelectorAll("td")[13].textContent;
      let rCombustivel = document.querySelectorAll("td")[15].textContent;
      let rfipe = document.querySelectorAll("td")[91].textContent;
      let ripva = document.querySelectorAll("td.tableNumber")[2].textContent;
      let rvalor = document.querySelectorAll("td")[93].textContent;
      let rlogo = document.querySelector("img.fipeLogoDIV.fipeLogoIMG.lazyloaded").src;

      var campos = {
        "marca": rmarca,
        "modelo": rmodelo,
        "AnoModelo": rAnoModelo,
        "cor": rcor,
        "cilindradas": rcilindradas,
        "potencia": rpotencia,
        "Combustivel": rCombustivel,
        "fipe": rfipe,
        "ipva": ripva,
        "valor": rvalor,
        "logo": rlogo
      };

      return campos;

    });
    await browser.close();
    return resultado;
  } else {
    var campos = {
      "marca": "---",
      "modelo": "---",
      "AnoModelo": "---",
      "cor": "---",
      "cilindradas": "---",
      "potencia": "---",
      "Combustivel": "---",
      "fipe": "---",
      "ipva": "---",
      "valor": "---",
      "logo": " "
    };

    return campos;
  }
}

//Renderização da página de erro.

app.get('*', isLoggedIn, (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(__dirname + '/erro.html');
})