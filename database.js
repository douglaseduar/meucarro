import mysql from 'mysql2/promise';

const database = {};

database.con = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meudeus',
  port: '3306'
})


database.con.connect();

database.getVeiculos = async function (id) {
  let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE FK_CLIENTE_id_cliente = ?', [id]);

  return rows;
}
database.getVeiculo = async function (id, placa) {
  let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE FK_CLIENTE_id_cliente = ? AND placa = ?', [id, placa]);

  return rows;
}
database.deleteVeiculo = async function (id, idcliente) {
  let [data] = await database.con.execute('DELETE FROM veiculo WHERE id_placa = ? AND FK_CLIENTE_id_cliente = ?', [id, idcliente]);

  return {
    'deletado': id
  }
}
database.getAgendamento = async function (id) {
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id_placa = a.FK_VEICULO_id_placa and a.FK_CLIENTE_id_cliente = ? and a.cancelado = 0 ORDER BY realizado = 1, data desc', [id]);

  return rows;
}
database.getAgendamentoesp = async function (id, pesquisa) {
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where a.cancelado = 0 AND v.id_placa = a.FK_VEICULO_id_placa and a.FK_CLIENTE_id_cliente = ? AND v.placa LIKE CONCAT("%", ?,  "%") OR v.modelo LIKE CONCAT("%", ?,  "%") ORDER BY realizado = 1, data desc', [id, pesquisa, pesquisa]);

  return rows;
}
database.geteditAgendamento = async function (id, sessionid) {
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id_placa = a.FK_VEICULO_id_placa and a.id_agendamento = ? and a.FK_CLIENTE_id_cliente = ? AND a.realizado = 0 AND cancelado = 0', [id, sessionid]);

  return rows;
}
database.getaviso = async function (id) {
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo, c.telefone from agendamento a, veiculo v, cliente c where v.id_placa = a.FK_VEICULO_id_placa and a.FK_CLIENTE_id_cliente = c.id_cliente and a.id_agendamento = ?', [id]);

  return rows;
}
database.getestatisticac = async function () {
  let [rows, fields] = await database.con.execute('select id_cliente from cliente');

  return rows;
}
database.getestatisticatipos = async function () {
  let [rows, fields] = await database.con.execute('select FK_TIPOS_VEICULO_id_tipo from veiculo where FK_TIPOS_VEICULO_id_tipo = 1');

  return rows;
}
database.getestatisticatiposs = async function () {
  let [rows, fields] = await database.con.execute('select FK_TIPOS_VEICULO_id_tipo from veiculo where FK_TIPOS_VEICULO_id_tipo = 2');

  return rows;
}
database.getestatisticatiposss = async function () {
  let [rows, fields] = await database.con.execute('select FK_TIPOS_VEICULO_id_tipo from veiculo where FK_TIPOS_VEICULO_id_tipo = 3');

  return rows;
}
database.getestatisticatipossss = async function () {
  let [rows, fields] = await database.con.execute('select FK_TIPOS_VEICULO_id_tipo from veiculo where FK_TIPOS_VEICULO_id_tipo = 4 OR FK_TIPOS_VEICULO_id_tipo = 5');

  return rows;
}

database.getestatisticaclientes = async function () {
  let [rows, fields] = await database.con.execute('select c.nome, COUNT(a.FK_CLIENTE_id_cliente) AS numero FROM agendamento a, cliente c WHERE realizado = 1 AND NOT cancelado = 1 AND C.id_cliente = a.FK_CLIENTE_id_cliente GROUP BY FK_CLIENTE_id_cliente ORDER BY COUNT(FK_CLIENTE_id_cliente) DESC LIMIT 1');

  return rows;
}
database.getestatisticacar = async function () {
  let [rows, fields] = await database.con.execute('select id_placa from veiculo');

  return rows;
}
database.getestatisticafide = async function () {
  let [rows, fields] = await database.con.execute('select id_fidelidade from fidelidade');

  return rows;
}
database.getestatisticafides = async function () {
  let [rows, fields] = await database.con.execute('select id_fidelidade from fidelidade where utilizado = 1');

  return rows;
}
database.getestatisticaag = async function () {
  let [rows, fields] = await database.con.execute('select id_agendamento from agendamento where realizado = 1 AND NOT cancelado = 1');

  return rows;
}
database.getestatisticaagsc = async function () {
  let [rows, fields] = await database.con.execute('select id_agendamento from agendamento where cancelado = 1');

  return rows;
}
database.getestatisticaags = async function () {
  let [rows, fields] = await database.con.execute('select id_agendamento from agendamento where realizado = 0 AND NOT cancelado = 1');

  return rows;
}
database.getestatisticaagp = async function (vdata, vdata1) {
  let [rows, fields] = await database.con.execute("select id_agendamento from agendamento where NOT cancelado = 1 AND realizado = 1 AND DATE_FORMAT((data), '%Y-%m-%d') BETWEEN ? AND ?", [vdata, vdata1]);

  return rows;
}
database.getestatisticaagscp = async function (vdata, vdata1) {
  let [rows, fields] = await database.con.execute("select id_agendamento from agendamento where cancelado = 1 AND DATE_FORMAT((data), '%Y-%m-%d') BETWEEN ? AND ?", [vdata, vdata1]);
  return rows;
}
database.getestatisticaagsp = async function (vdata, vdata1) {
  let [rows, fields] = await database.con.execute("select id_agendamento from agendamento where NOT cancelado = 1 AND realizado = 0 AND DATE_FORMAT((data), '%Y-%m-%d') BETWEEN ? AND ?", [vdata, vdata1]);

  return rows;
}
database.getestatisticaclientesp = async function (vdata, vdata1) {
  let [rows, fields] = await database.con.execute("select c.nome, COUNT(a.FK_CLIENTE_id_cliente) AS numero FROM agendamento a, cliente c WHERE realizado = 1 AND NOT cancelado = 1 AND C.id_cliente = a.FK_CLIENTE_id_cliente AND DATE_FORMAT((a.data), '%Y-%m-%d') BETWEEN ? AND ? GROUP BY FK_CLIENTE_id_cliente ORDER BY COUNT(FK_CLIENTE_id_cliente) DESC LIMIT 1", [vdata, vdata1]);

  return rows;
}
database.getvencido = async function (id) {
  let [rows, fields] = await database.con.execute('select v.placa, v.modelo, c.telefone from veiculo v, cliente c, agendamento a where v.id_placa = a.FK_VEICULO_id_placa AND c.id_cliente = a.FK_CLIENTE_id_cliente and a.id_agendamento = ?', [id]);

  return rows;
}
database.alterarvencido = async function (id) {
  let [rows, fields] = await database.con.execute('UPDATE agendamento SET lembrete = 1 where id_agendamento = ?', [id]);

  return rows;
}
database.alteraraviso = async function (idag) {
  let [rows, fields] = await database.con.execute('UPDATE agendamento SET aviso = 1 where id_agendamento = ?', [idag]);

  return rows;
}
database.modificavencido = async function (placa, idcliente, idag) {
  let [rows, fields] = await database.con.execute('UPDATE agendamento SET lembrete = 1 WHERE FK_VEICULO_id_placa = ? AND FK_CLIENTE_id_cliente = ? AND NOT id_agendamento = ?', [placa, idcliente, idag]);

  return rows;
}
database.geteditAgendamentoadmin = async function (id) {
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id_placa = a.FK_VEICULO_id_placa and a.id_agendamento = ?', [id]);

  return rows;
}
database.getAgendamentoadmin = async function () {
  let [rows, fields] = await database.con.execute('SELECT ag.*, v.placa, v.modelo, c.nome, c.id_cliente FROM agendamento ag, veiculo v, cliente c WHERE v.id_placa = ag.FK_VEICULO_id_placa AND c.id_cliente = ag.FK_CLIENTE_id_cliente AND NOT cancelado = 1 ORDER BY ag.realizado = 1, ag.data');

  return rows;
}
database.getAgendamentoespadmin = async function (pesquisa) {
  let [rows, fields] = await database.con.execute('SELECT ag.*, v.placa, v.modelo, c.nome, c.id_cliente FROM agendamento ag, veiculo v, cliente c WHERE v.id_placa = ag.FK_VEICULO_id_placa AND c.id_cliente = ag.FK_CLIENTE_id_cliente AND NOT cancelado = 1 AND v.placa LIKE CONCAT("%", ?,  "%") OR v.modelo LIKE CONCAT("%", ?,  "%") ORDER BY realizado = 1, ag.data', [pesquisa, pesquisa]);

  return rows;
}
database.getAgendamentoadminhoje = async function () {
  let [rows, fields] = await database.con.execute("SELECT ag.*, v.placa, v.modelo, c.nome, c.id_cliente FROM agendamento ag, veiculo v, cliente c WHERE v.id_placa = ag.FK_VEICULO_id_placa AND c.id_cliente = ag.FK_CLIENTE_id_cliente AND NOT cancelado = 1 AND DATE_FORMAT((ag.data), '%Y-%m-%d') = DATE_FORMAT((NOW( )), '%Y-%m-%d') ORDER BY realizado = 1, ag.data");

  return rows;
}
database.getAgendamentoadminamanha = async function () {
  let [rows, fields] = await database.con.execute("SELECT ag.*, v.placa, v.modelo, c.nome, c.id_cliente FROM agendamento ag, veiculo v, cliente c WHERE v.id_placa = ag.FK_VEICULO_id_placa AND c.id_cliente = ag.FK_CLIENTE_id_cliente AND NOT cancelado = 1 AND DATE_FORMAT((ag.data), '%Y-%m-%d') = DATE_FORMAT(DATE_ADD(NOW( ), INTERVAL 1 DAY), '%Y-%m-%d') ORDER BY ag.realizado = 1, ag.data");

  return rows;
}
database.getAgendamentoadminvencido = async function () {
  let [rows, fields] = await database.con.execute("SELECT v.*, a.*, c.* FROM veiculo v, cliente c, agendamento a WHERE lembrete = 0 AND v.id_placa = a.FK_VEICULO_id_placa AND c.id_cliente = a.FK_CLIENTE_id_cliente AND NOT cancelado = 1 AND NOT realizado = 0 AND DATE_FORMAT((a.data), '%Y-%m-%d') <= DATE_FORMAT(DATE_ADD(NOW( ), INTERVAL -1 YEAR), '%Y-%m-%d') ORDER BY a.data desc");

  return rows;
}
database.getAgendamentodetalhe = async function (id) {
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id_placa = a.FK_VEICULO_id_placa and a.id_agendamento = ?', [id]);

  return rows;
}
database.getClientedetalhe = async function (id) {
  let [rows, fields] = await database.con.execute('select * from cliente where id_cliente = ?', [id]);

  return rows;
}
database.getDados = async function (id) {
  let [rows, fields] = await database.con.execute('SELECT id_cliente, nome, telefone, email, endereco, foto, qtd_fidelidade FROM cliente WHERE id_cliente = ?', [id]);

  return rows;
}
database.getHorario = async function (data) {
  let [rows, fields] = await database.con.execute('SELECT data FROM agendamento WHERE data = ? AND cancelado = 0 AND realizado = 0', [data]);

  return rows;
}
database.insertVeiculo = async function (placa, resposta, tipo, cliente) {
  let [data] = await database.con.execute('INSERT INTO veiculo (placa, modelo, FK_TIPOS_VEICULO_id_tipo, FK_CLIENTE_id_cliente) VALUES (?, ?, ?, ?)',
    [placa, resposta, cliente, tipo]);

  return {
    'numero': data.insertId
  }
}
database.insertAgendamento = async function (fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente) {
  let [data] = await database.con.execute('INSERT INTO agendamento (FK_VEICULO_id_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_combustivel, outro_filtro, filtro_racor, data, realizado, aviso, foto, cancelado, FK_CLIENTE_id_cliente, lembrete, km) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, "", 0, ?, 0, "")',
    [fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente]);

  return {
    'numero': data.insertId
  }
}
database.insertUser = async function (id_cliente, nome, telefone, permicao, email, endereco, foto, fidelidade) {
  let [data] = await database.con.execute('INSERT INTO cliente (id_cliente, nome, telefone, permissao, email, endereco, foto, qtd_fidelidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id_cliente, nome, telefone, permicao, email, endereco, foto, fidelidade]);

  return {
    'numero': data.insertId
  }
}
database.insertCliente = async function (email, telefone, endereco, nome, permicao, fidelidade, foto) {
  let [data] = await database.con.execute('INSERT INTO cliente (nome, telefone, permissao, id_cliente, email, endereco, qtd_fidelidade, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, telefone, permicao, email, email, endereco, fidelidade, foto]);

  return {
    'numero': data.insertId
  }
}

database.editUser = async function (nome, telefone, email, foto, endereco, id) {
  let [data] = await database.con.execute('UPDATE cliente SET nome = ?, telefone = ?, email = ?, foto = ?, endereco = ? WHERE id_cliente = ?', [nome, telefone, email, foto, endereco, id]);

  return {
    'alterado': id
  }
}
database.editAgendamento = async function (observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente, id) {
  let [data] = await database.con.execute('UPDATE agendamento SET observacao = ?, oleo = ?, filtro_oleo = ?, filtro_ar = ?, filtro_arcondicionado = ?, filtro_combustivel = ?, outro_filtro = ?, filtro_racor = ?, data = ? WHERE id_agendamento = ? AND realizado = ? and FK_CLIENTE_id_cliente = ?', [observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, id, realizado, fk_cliente]);
  return {
    'alterado': id
  }
}
database.editAgendamentoadmin = async function (observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, realizado, foto, id) {
  let [data] = await database.con.execute('UPDATE agendamento SET observacao = ?, oleo = ?, filtro_oleo = ?, filtro_ar = ?, filtro_arcondicionado = ?, filtro_combustivel = ?, outro_filtro = ?, filtro_racor = ?, km = ?, realizado = ?, foto = ? WHERE id_agendamento = ?', [observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, realizado, foto, id]);
  return {
    'alterado': id
  }
}
database.deleteAgendamento = async function (id) {
  let [data] = await database.con.execute('UPDATE agendamento SET cancelado = 1 WHERE id_agendamento = ?', [id]);

  return {
    'deletado': id
  }
}
database.deleteAgendamentoc = async function (id, sessionid) {
  let [data] = await database.con.execute('UPDATE agendamento SET cancelado = 1 WHERE id_agendamento = ? AND FK_CLIENTE_id_cliente = ?', [id, sessionid]);

  return {
    'deletado': id
  }
}
database.getAgendamentocomcliente = async function (id) {
  let [rows, fields] = await database.con.execute('SELECT a.*, v.placa, v.modelo, c.telefone, c.id_cliente FROM agendamento a, veiculo v, cliente c WHERE a.FK_VEICULO_id_placa = v.id_placa and a.FK_CLIENTE_id_cliente = c.id_cliente and a.id_agendamento = ?', [id]);

  return rows;
}
database.getLogin = async function (sessionid) {
  let [rows, fields] = await database.con.execute('SELECT * FROM cliente WHERE id_cliente = ?', [sessionid]);

  return rows;
}
database.getClientecomemail = async function (email) {
  let [rows, fields] = await database.con.execute('SELECT * FROM cliente WHERE email = ?', [email]);

  return rows;
}
database.setLogin = async function (id, nome, foto, email) {
  let [data] = await database.con.execute('UPDATE cliente SET id_cliente = ?, nome = ?, foto = ? WHERE id_cliente = ?', [id, nome, foto, email]);

  return {
    'alterado': "asd"
  }
}
// database.setAg = async function (id, email) {
//   let [data] = await database.con.execute('UPDATE agendamento SET FK_CLIENTE_id_cliente = ? WHERE FK_CLIENTE_id_cliente = ?', [id, email]);

//   return {
//     'alterado': "asd"
//   }
// }
// database.setCarro = async function (id, email) {
//   let [data] = await database.con.execute('UPDATE veiculo SET FK_CLIENTE_id_cliente = ? WHERE FK_CLIENTE_id_cliente = ?', [id, email]);

//   return {
//     'alterado': "asd"
//   }
//}

database.getFidelidade = async function (id) {
  let [rows, fields] = await database.con.execute('SELECT * FROM fidelidade WHERE FK_CLIENTE_id_cliente = ? AND utilizado = 0', [id]);

  return rows;
}
database.getFidelidades = async function () {
  let [rows, fields] = await database.con.execute('SELECT f.*, c.nome, c.id_cliente FROM fidelidade f, cliente c where f.FK_CLIENTE_id_cliente = c.id_cliente ORDER BY f.utilizado = 1');

  return rows;
}

database.insertFidelidade = async function (id, gift, realizado) {
  let [rows, fields] = await database.con.execute('INSERT INTO fidelidade (cupom, FK_CLIENTE_id_cliente, utilizado) VALUES (?, ?, ?)', [gift, id, realizado]);

  return rows;
}
database.putFidelidades = async function (idfidelidade) {
  let [data] = await database.con.execute('UPDATE fidelidade SET utilizado = 1 where id_fidelidade = ?', [idfidelidade]);

  return data;
}
database.putqtdf = async function (idcliente) {
  let [data] = await database.con.execute('UPDATE cliente SET qtd_fidelidade = qtd_fidelidade + 1 where id_cliente = ?', [idcliente]);

  return data;
}
database.getclientecomfidelidade = async function (idfidelidade) {
  let [data] = await database.con.execute('SELECT * FROM fidelidade WHERE id_fidelidade = ?', [idfidelidade]);

  return data;
}

database.putzerarf = async function (idcliente) {
  let [data] = await database.con.execute('UPDATE cliente SET qtd_fidelidade = 0 WHERE id_cliente = ?', [idcliente]);

  return data;
}

export default database;