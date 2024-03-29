import express, { text } from 'express';
import database from './database.js';
import url from 'url';
import path from 'path';
import fileupload from 'express-fileupload'
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
var caminhopadrao = path.dirname(__filename);


app.listen(8080, () => console.log('Servidor rodando!'));

venom.create().then((client) => start(client));

app.use((req, res, next) => {
  console.log(req.url);
  next();
})

app.use(fileupload());
app.use(express.json());
app.use(express.static('assets/css'));
app.use(express.static('assets/js'));
app.use(express.static('assets/img'));
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
      await database.setLogin(idfacebook, nome, foto, respostaemail[0].id_cliente); //mudar informações do cliente
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
  database.deleteVeiculo(req.params.id, req.user.id);
  res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
})
app.post('/car', isLoggedIn, async (req, res) => {
  let {
    placa,
    tipo
  } = req.body;
  let cliente = req.user.id;
  let respostacarro = await database.getVeiculo(cliente, placa);
  if(respostacarro == ![]){
  let respostarobo = await robo(placa);
  let aux = respostarobo.marca + " " + respostarobo.modelo;
  res.status(201).send(database.insertVeiculo(placa, aux, cliente, tipo));
  }else{res.status(201).send("veículo já existe");}
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
app.get('/horario/:hora', isLoggedIn, async (req, res) => {
  let auxverificacao = 0;
  let respostahora = await database.getHorario(req.params.hora);
  let databancodedados = new Date(req.params.hora); 
  if(respostahora.length >= 1){
    let dataverificaocao = new Date(req.params.hora);
    for(let i = dataverificaocao.getHours(); i<=18; i++){
      databancodedados.setHours(i-3);
      let stringdata = databancodedados.toISOString().split('T')[0] + "T" + databancodedados.toISOString().split('T')[1].split(":")[0] + ":00";
      let respostahorafor = await database.getHorario(stringdata);
      if(respostahorafor.length == 0){
        res.send([{
          livre: 0,
          possivelhorario: stringdata
        }]); 
        auxverificacao = 1;
        break;
      }}
      if(auxverificacao == 0){
        res.send([{
          livre: 2,
        }]); 
      }
    }else{
      res.send([{
        livre: 1
      }]); 
    }


  }
)

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
    await database.putFidelidades(idfidelidade);
    let respostafidelidade = await database.getclientecomfidelidade(idfidelidade);
    await database.putzerarf(respostafidelidade[0].FK_CLIENTE_id_cliente);
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
  const link = `https://newsdata.io/api/1/news?apikey=pub_9045d02aa3dde8a8642911a1673ef7f21ca9&q=gasolina%20OR%20ipva%20OR%20automóvel%20OR%20automóveis&language=pt`;
  request(link, (err, response, html) => {
    if (!err) {
      const json1 = JSON.parse(html);
      res.send(json1.results);

    }
  });

})

//Função para envio das mensagens no WhatsApp.

async function start(client) {

  app.post('/agender', isLoggedIn, async (req, res) => {
    let {fk_placa, 
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
    res.status(201).send(await database.insertAgendamento(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id));
    if (respostatel.telefone != "") {
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number1 = "55" + respostatel[0].telefone + "@c.us";
        let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        mandarmsg(number1, menssage);
    }
  })
  app.delete('/editagender/:id', isLoggedIn, async (req, res) => {
    let {
      vdata,
      placa
    } = req.body;
    let respostatel1 = await database.getLogin(req.user.id);
    database.deleteAgendamentoc(req.params.id, req.user.id);
    if (respostatel1[0].telefone != "") {
      let number = "55" + respostatel1[0].telefone + "@c.us";
      let menssage = "❌ *CANCELAMENTO!*\n\nPlaca: " + placa.toUpperCase() + "\nData: " + vdata + "\n_id do agendamento: " + req.params.id + "_\n\nSe você não for a pessoa que fez a solicitação, entre em contato conosco!";
      mandarmsg(number, menssage);  
    }
  })
  app.delete('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
    let respostaadmin = await database.getLogin(req.user.id);
    if (respostaadmin[0].permissao == 1) {
    let respostaag = await database.getAgendamentocomcliente(req.params.id);
    res.status(201).send(database.deleteAgendamento(req.params.id));
    if (respostaag[0].telefone != "") {
      let number = "55" + respostaag[0].telefone + "@c.us";
      let gdata = respostaag[0].data.split("T");
      let hora = gdata[1];
      let auxdata = gdata[0].split("-");
      let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
      let menssage = "😥 *QUE PENA!*\nVocê não compareceu ao agendamento marcado para o dia " + datamesmo + " do veículo com placa: " + respostaag[0].placa.toUpperCase() + "\n\nPara remarcar entre em contato conosco!";
     mandarmsg(number, menssage);
    }}
  })
  app.put('/editagenderadmin/:id', isLoggedIn, async (req, res) => {
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
    let respostaadmin = await database.getLogin(req.user.id);
    if (respostaadmin[0].permissao == 1) {
    let nomerealzaozao = "";
    let respostac = await database.getAgendamentocomcliente(req.params.id);
    let number = "55" + respostac[0].telefone + "@c.us";
    let menssage = "🔧 *SERVIÇO CONCLUÍDO!*\n\nPode vir retirar seu veículo " + respostac[0].placa.toUpperCase() + ", ele já está novinho em folha!\n\nPara verificar os detalhes da troca acesse: meucarro.com.br/historico";
    if (req.files) {
      var file = req.files.foto;
      var filename = file.name;
      var nome = filename.split(".");
      var nomerealzao = nome[1];
      nomerealzaozao = req.params.id + respostac[0].id_cliente + "." + nomerealzao;

      file.mv('./assets/img/agend/' + nomerealzaozao, function (err) {
        if (err) {
          res.send(err)
        }else{
          if (respostac[0].telefone != "") {
            mandarfoto(number, caminhopadrao + '/assets/img/agend/' + nomerealzaozao, nomerealzaozao, menssage);
            }
        }
      })
    }else if(respostac[0].telefone != "") {
      mandarmsg(number, menssage);
      }
    await database.modificavencido(respostac[0].FK_VEICULO_id_placa, respostac[0].id_cliente, req.params.id);  
    await database.editAgendamentoadmin(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, 1, nomerealzaozao, req.params.id);
    await database.putqtdf(respostac[0].id_cliente);
    res.status(201).redirect('/admin');}
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
    res.status(201).send(await database.editAgendamento(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, req.user.id, req.params.id));
    if (respostatel2[0].telefone != "") {
      let number = "55" + respostatel2[0].telefone + "@c.us";
      let gdata = vdata.split("T");
      let hora = gdata[1];
      let auxdata = gdata[0].split("-");
      let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
      let menssage = "⚠️ *AGENDAMENTO ALTERADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
      mandarmsg(number, menssage);
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
    res.status(201).send(await database.editUser(nome, telefone, email, foto, endereco, req.user.id));
    if (telefone != "") {
      let number = "55" + telefone + "@c.us";
      let menssage = "🚗 *SEJA BEM VINDO(A) " + nome.toUpperCase() + "!*\n\nNós da Meu Carro agradecemos por você utilizar nosso serviço...\n\nPara mais informações acesse: www.meucarro.com.br/suporte";
      mandarmsg(number, menssage);
    }
  })
  app.post('/present', isLoggedIn, async (req, res) => {
    let respostagif = await database.getLogin(req.user.id);
    if (respostagif[0].qtd_fidelidade >= 5) {
      let verificarfidelidade = await database.getFidelidade(req.user.id);
      if (verificarfidelidade == ![]) {
        let auxgift = Math.floor(Math.random() * 999999) + 100000;
        database.insertFidelidade(req.user.id, auxgift, 0);
        if(respostagif[0].telefone != ""){
            let menssage = "🎁 *PARABÉNS VOCÊ GANHOU!*\n\nPara reinvindicar seu prêmio vá até a nossa loja e utilize o código abaixo:\n\n*" + auxgift + "*";
            let number = "55" + respostagif[0].telefone + "@c.us";
            mandarmsg(number, menssage);
        }
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
    res.status(201).send(await database.alteraraviso(idag));
    if(respostaaviso[0].telefone != ""){
        let gdata = respostaaviso[0].data.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let menssage = "📢 *NÃO VÁ ESQUECER HEIN*\nVocê tem um agendamento marcado conosco:\n\nDia " + datamesmo + "\n\nSó trazer o veículo: " + respostaaviso[0].placa.toUpperCase() + " para Rua Manoel Estevão, 431 - Centro - União da Vitória.";
        let number = "55" + respostaaviso[0].telefone + "@c.us";
        mandarmsg(number, menssage);
    }
  })
  app.put('/vencidos/', isLoggedIn, async (req, res) => {
    let {
      idvencido
    } = req.body;
    let respostavencido = await database.getvencido(idvencido);
    await database.alterarvencido(idvencido);
    if(respostavencido[0].telefone != ""){
        let menssage = "📅 *FAZ UM TEMPINHO!*\n\n Que você não aparece para trocar o óleo do veículo: " + respostavencido[0].placa.toUpperCase() + "\n\n Agende sua troca conosco para preservar a vida útil do seu motor!";
        let number = "55" + respostavencido[0].telefone + "@c.us";
        mandarmsg(number, menssage)
    }
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
        if(telefone != ""){
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number1 = "55" + telefone + "@c.us";
        let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        mandarmsg(number1, menssage);
        }
      } else {
        let verificaveiculo = await database.getVeiculo(verificacadastro[0].id_cliente, placao);
        if (verificaveiculo == ![]) {
          let numeroplaca1 = await database.insertVeiculo(placao, respostarobo.marca + " " + respostarobo.modelo, verificacadastro[0].id_cliente, tipo);
          database.insertAgendamento(numeroplaca1.numero, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, verificacadastro[0].id_cliente);
        } else {
          database.insertAgendamento(verificaveiculo[0].id_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, 0, verificacadastro[0].id_cliente);
        }
      
      if (verificacadastro[0].telefone != "") {
        let gdata = vdata.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
        let number1 = "55" + verificacadastro[0].telefone + "@c.us";
        let menssage = "✔ *AGENDAMENTO REALIZADO COM SUCESSO!*\n\nPlaca: " + placao.toUpperCase() + "\nData: " + datamesmo + "\nObservação: " + observacao + "\n\nPara consultar seus agendamentos acesse: meucarro.com.br/historico";
        mandarmsg(number1, menssage);
      }
  
  }}})

  async function mandarmsg(telefone, mensagem){
      client.sendText(telefone, mensagem)
      .then((result) =>{console.log('Result: ', result);})
      .catch((erro) => {
        console.error('Error when sending: ', erro);
        let aux = telefone.substr(0, 4);
        let aux1 = telefone.substr(5);
        let corrigido = aux + aux1;
        client.sendText(corrigido, mensagem)
        .then((result) =>{console.log('Result: ', result);})
        .catch((erro) => {
          console.error('Error when sending: ', erro)
          let aux = telefone.substr(0, 4);
          let aux1 = telefone.substr(5);
          let corrigido = aux + '9' + aux1;
          client.sendText(corrigido, mensagem)
        .then((result) =>{console.log('Result: ', result);})
        .catch((erro) => {
          console.error('Error when sending: ', erro)});
        });
      });

  }

  async function mandarfoto(telefone, fullpath, path, mensagem){
      await client.sendImage(
        telefone,
        fullpath,
        path,
        mensagem
      ).then((result) =>{console.log('Result: ', result);})
      .catch((erro) => {
        console.error('Error when sending: ', erro);
        let aux = telefone.substr(0, 4);
        let aux1 = telefone.substr(5);
        let corrigido = aux + aux1;
        client.sendImage(
          corrigido,
          fullpath,
          path,
          mensagem
        ).then((result) =>{console.log('Result: ', result);})
        .catch((erro) => {console.error('Error when sending: ', erro)
        let aux = telefone.substr(0, 4);
        let aux1 = telefone.substr(5);
        let corrigido = aux + '9' + aux1;
        client.sendImage(
          corrigido,
          fullpath,
          path,
          mensagem
        ).then((result) =>{console.log('Result: ', result);})
        .catch((erro) => {console.error('Error when sending: ', erro) });
      });
      });

  }
}


//Função para retornar dados das Placas.

async function robo(placa) {
  let placaaux = placa.toUpperCase();
  var regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
  try {
  if (placaaux.match(regex)) {
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
    const vaidar = await page.evaluate(() => {
      const nodeList = document.querySelectorAll("td");
      const textArray = [...nodeList];
      const list = textArray.map(({textContent}) => ({textContent}));
      return list;

    })

      var campos = {
        "marca": vaidar[1].textContent,
        "modelo": vaidar[3].textContent,
        "AnoModelo": vaidar[5].textContent,
        "cor": vaidar[9].textContent,
        "cilindradas": vaidar[11].textContent,
        "potencia": vaidar[13].textContent,
        "Combustivel": vaidar[15].textContent,
        "fipe": "N/A",
        "ipva": "N/A",
        "valor": "N/A",
        "logo": " "
      };

     

    await browser.close();
    return campos;
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
} catch (error){
  console.log(error);
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
}}


//Renderização da página de erro.

app.get('*', isLoggedIn, (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(__dirname + '/erro.html');
})