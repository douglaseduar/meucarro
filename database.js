import mysql from 'mysql2/promise';

const database = {};

database.con = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meu_carro',
    port: '3306'
})


database.con.connect();

database.getVeiculos = async function(id){
   let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE fk_cliente = ?', [id]);
    
    return rows;
}
database.getVeiculo = async function(id, placa){
  let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE fk_cliente = ? AND placa = ?', [id, placa]);
   
   return rows;
}
database.deleteVeiculo = async function(id){
    let [data] = await database.con.execute('DELETE FROM veiculo WHERE id = ?', [id]);

    return {'deletado': id}
}
database.getAgendamento = async function(id){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id = a.fk_placa and a.fk_cliente = ? ORDER BY realizado = 1, data desc', [id]);
   
   return rows;
}
database.getAgendamentoesp = async function(id, pesquisa){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.placa LIKE ? AND v.id = a.fk_placa and a.fk_cliente = ? ORDER BY realizado = 1, data desc;', [pesquisa, id]);
   
   return rows;
}
database.geteditAgendamento = async function(id, sessionid){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id = a.fk_placa and a.id = ? and a.fk_cliente = ?', [id, sessionid]);
   
   return rows;
}
database.getaviso = async function(id){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo, c.telefone from agendamento a, veiculo v, cliente c where v.id = a.fk_placa and a.fk_cliente = c.sessionid and a.id = ?', [id]);
   
   return rows;
}
database.getestatisticac = async function(){
  let [rows, fields] = await database.con.execute('select id from cliente');
   
   return rows;
}
database.getestatisticatipos = async function(){
  let [rows, fields] = await database.con.execute('select tipo from veiculo where tipo = 1');
   
   return rows;
}
database.getestatisticatiposs = async function(){
  let [rows, fields] = await database.con.execute('select tipo from veiculo where tipo = 2');
   
   return rows;
}
database.getestatisticatiposss = async function(){
  let [rows, fields] = await database.con.execute('select tipo from veiculo where tipo = 3');
   
   return rows;
}
database.getestatisticatipossss = async function(){
  let [rows, fields] = await database.con.execute('select tipo from veiculo where tipo = 4');
   
   return rows;
}
database.getestatisticaclientes = async function(){
  let [rows, fields] = await database.con.execute('select c.nome, COUNT(a.fk_cliente) AS numero FROM agendamento a, cliente c WHERE realizado = 1 AND C.sessionid = a.fk_cliente GROUP BY fk_cliente ORDER BY COUNT(fk_cliente) DESC LIMIT 1');
   
   return rows;
}
database.getestatisticacar = async function(){
  let [rows, fields] = await database.con.execute('select id from veiculo');
   
   return rows;
}
database.getestatisticafide = async function(){
  let [rows, fields] = await database.con.execute('select id from fidelidade');
   
   return rows;
}
database.getestatisticafides = async function(){
  let [rows, fields] = await database.con.execute('select id from fidelidade where utilizado = 1');
   
   return rows;
}
database.getestatisticaag = async function(){
  let [rows, fields] = await database.con.execute('select id from agendamento where realizado = 1');
   
   return rows;
}
database.getestatisticaagsc = async function(){
  let [rows, fields] = await database.con.execute('select * from cancelado');
   
   return rows;
}
database.getestatisticaags = async function(){
  let [rows, fields] = await database.con.execute('select id from agendamento where realizado = 0');
   
   return rows;
}
database.getestatisticaagp = async function(vdata, vdata1){
  let [rows, fields] = await database.con.execute("select id from agendamento where realizado = 1 AND DATE_FORMAT((data), '%Y-%m-%d') BETWEEN ? AND ?", [vdata, vdata1]);
   
   return rows;
}
database.getestatisticaagscp = async function(vdata, vdata1){
  let [rows, fields] = await database.con.execute("select * from cancelado WHERE DATE_FORMAT((data), '%Y-%m-%d') BETWEEN ? AND ?", [vdata, vdata1]);   
   return rows;
}
database.getestatisticaagsp = async function(vdata, vdata1){
  let [rows, fields] = await database.con.execute("select id from agendamento where realizado = 0 AND DATE_FORMAT((data), '%Y-%m-%d') BETWEEN ? AND ?", [vdata, vdata1]);
   
   return rows;
}
database.getestatisticaclientesp = async function(vdata, vdata1){
  let [rows, fields] = await database.con.execute("select c.nome, COUNT(a.fk_cliente) AS numero FROM agendamento a, cliente c WHERE realizado = 1 AND C.sessionid = a.fk_cliente AND DATE_FORMAT((a.data), '%Y-%m-%d') BETWEEN ? AND ? GROUP BY fk_cliente ORDER BY COUNT(fk_cliente) DESC LIMIT 1", [vdata, vdata1]);
   
   return rows;
}
database.getvencido = async function(id){
  let [rows, fields] = await database.con.execute('select v.placa, v.modelo, c.telefone from veiculo v, cliente c, ultimosagendamentos ul where v.placa = ul.fk_placa and ul.fk_cliente = c.sessionid and ul.id = ?', [id]);
   
   return rows;
}
database.alterarvencido = async function(id){
  let [rows, fields] = await database.con.execute('UPDATE ultimosagendamentos SET avisado = 1 where id = ?', [id]);
   
   return rows;
}
database.alteraraviso = async function(idag){
  let [rows, fields] = await database.con.execute('UPDATE agendamento SET aviso = 1 where id = ?', [idag]);
   
   return rows;
}
database.geteditAgendamentoadmin = async function(id){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id = a.fk_placa and a.id = ?', [id]);
   
   return rows;
}
database.getAgendamentoadmin = async function(){
  let [rows, fields] = await database.con.execute('SELECT ag.*, v.placa, v.modelo, c.nome, c.sessionid FROM agendamento ag, veiculo v, cliente c WHERE v.id = ag.fk_placa AND c.sessionid = ag.fk_cliente ORDER BY realizado = 1, ag.data');
   
   return rows;
}
database.getAgendamentoespadmin = async function(pesquisa){
  let [rows, fields] = await database.con.execute('SELECT ag.*, v.placa, v.modelo, c.nome, c.sessionid FROM agendamento ag, veiculo v, cliente c WHERE v.id = ag.fk_placa AND c.sessionid = ag.fk_cliente AND v.placa LIKE ? ORDER BY realizado = 1, ag.data', [pesquisa]);
   
   return rows;
}
database.getAgendamentoadminhoje = async function(){
  let [rows, fields] = await database.con.execute("SELECT ag.*, v.placa, v.modelo, c.nome, c.sessionid FROM agendamento ag, veiculo v, cliente c WHERE v.id = ag.fk_placa AND c.sessionid = ag.fk_cliente AND DATE_FORMAT((ag.data), '%Y-%m-%d') = DATE_FORMAT((NOW( )), '%Y-%m-%d') ORDER BY realizado = 1, ag.data");
   
   return rows;
}
database.getAgendamentoadminamanha = async function(){
  let [rows, fields] = await database.con.execute("SELECT ag.*, v.placa, v.modelo, c.nome, c.sessionid FROM agendamento ag, veiculo v, cliente c WHERE v.id = ag.fk_placa AND c.sessionid = ag.fk_cliente AND DATE_FORMAT((ag.data), '%Y-%m-%d') = DATE_FORMAT(DATE_ADD(NOW( ), INTERVAL 1 DAY), '%Y-%m-%d') ORDER BY realizado = 1, ag.data");
   
   return rows;
}
database.getAgendamentoadminvencido = async function(){
  let [rows, fields] = await database.con.execute("SELECT v.placa, v.modelo, c.nome, c.sessionid, ul.* FROM veiculo v, cliente c, ultimosagendamentos ul WHERE v.placa = ul.fk_placa AND c.sessionid = ul.fk_cliente AND DATE_FORMAT((ul.dataultimo), '%Y-%m-%d') <= DATE_FORMAT(DATE_ADD(NOW( ), INTERVAL -1 YEAR), '%Y-%m-%d') ORDER BY ul.dataultimo;");
   
   return rows;
}
database.getAgendamentodetalhe = async function(id){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id = a.fk_placa and a.id = ?', [id]);
   
   return rows;
}
database.getClientedetalhe = async function(id){
  let [rows, fields] = await database.con.execute('select * from cliente where sessionid = ?', [id]);
   
   return rows;
}


database.getDados = async function(id){
  let [rows, fields] = await database.con.execute('SELECT id, nome, telefone, email, endereco, foto, fidelidade FROM cliente WHERE sessionid = ?', [id]);
   
   return rows;
}

database.insertVeiculo = async function(placa, resposta, cliente, tipo){
 let [data] = await database.con.execute('INSERT INTO veiculo (placa, modelo, fk_cliente, tipo) VALUES (?, ?, ?, ?)', 
    [placa, resposta, cliente, tipo]);

  return {'numero': data.insertId}
}
database.insertAgendamento = async function(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente){
  let [data] = await database.con.execute('INSERT INTO agendamento (fk_placa, obeservacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, data, realizado, fk_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
     [fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente]);
 
   return {'numero': data.insertId}
 }
database.insertUser = async function(nome, telefone, permicao, sessionid, email, endereco, foto, fidelidade){
  let [data] = await database.con.execute('INSERT INTO cliente (nome, telefone, permicao, sessionid, email, endereco, foto, fidelidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
     [nome, telefone, permicao, sessionid, email, endereco, foto, fidelidade]);
 
   return {'numero': data.insertId}
 }
 database.insertCliente = async function(email, telefone, endereco, nome, permicao, fidelidade, foto){
  let [data] = await database.con.execute('INSERT INTO cliente (nome, telefone, permicao, sessionid, email, endereco, fidelidade, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
     [nome, telefone, permicao, email, email, endereco, fidelidade, foto]);
 
   return {'numero': data.insertId}
 }
 
database.editUser = async function(nome, telefone, email, foto, endereco, id){
   let [data] = await database.con.execute('UPDATE cliente SET nome = ?, telefone = ?, email = ?, foto = ?, endereco = ? WHERE sessionid = ?', [nome, telefone, email, foto, endereco, id]);

    return {'alterado': id}
}
database.editAgendamento = async function(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente, id){
  let [data] = await database.con.execute('UPDATE agendamento SET obeservacao = ?, oleo = ?, filtro_oleo = ?, filtro_ar = ?, filtro_arcondicionado = ?, filtro_gasolina = ?, filtro_hidraulico = ?, filtro_racor = ?, data = ? WHERE id = ? AND realizado = ? and fk_cliente = ?', [observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, id, realizado, fk_cliente]);
    return {'alterado': id}
}
database.editAgendamentoadmin = async function(observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, realizado, foto, id){
  let [data] = await database.con.execute('UPDATE agendamento SET obeservacao = ?, oleo = ?, filtro_oleo = ?, filtro_ar = ?, filtro_arcondicionado = ?, filtro_gasolina = ?, filtro_hidraulico = ?, filtro_racor = ?, km = ?, realizado = ?, foto = ? WHERE id = ?', [observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, km, realizado, foto, id]);
    return {'alterado': id}
}
database.deleteAgendamento = async function(id){
  let [data] = await database.con.execute('DELETE FROM agendamento WHERE id = ?', [id]);

  return {'deletado': id}
}
database.getAgendamentocomcliente = async function(id){
  let [rows, fields] = await database.con.execute('SELECT a.*, v.placa, v.modelo, c.telefone, c.sessionid FROM agendamento a, veiculo v, cliente c WHERE a.fk_placa = v.id and a.fk_cliente = c.sessionid and a.id = ?', [id]);

  return rows;
}
database.getVeiculosdetalhe = async function(id){
  let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE placa = ?', [id]);
   
   return rows;
}
database.getLogin = async function(sessionid){
  let [rows, fields] = await database.con.execute('SELECT * FROM cliente WHERE sessionid = ?', [sessionid]);
   
   return rows;
}
database.getClientecomemail = async function(email){
  let [rows, fields] = await database.con.execute('SELECT * FROM cliente WHERE email = ?', [email]);
   
   return rows;
}
database.setLogin = async function(email, hash){
  let [data] = await database.con.execute('UPDATE cliente SET sessionid = ? WHERE email = ?', [hash, email]);

    return {'alterado': "asd"}
}
database.getLoginsession = async function(email){
  let [rows, fields]  = await database.con.execute('SELECT id, sessionid FROM cliente WHERE email = ?', [email]);

  return rows;
}
database.getFidelidade = async function(id){
  let [rows, fields]  = await database.con.execute('SELECT * FROM fidelidade WHERE fk_cliente = ? AND utilizado = 0', [id]);

  return rows;
}
database.getFidelidades = async function(id){
  let [rows, fields]  = await database.con.execute('SELECT f.*, c.nome, c.sessionid FROM fidelidade f, cliente c where f.fk_cliente = c.sessionid ORDER BY f.utilizado = 1');

  return rows;
}

database.insertFidelidade = async function(id, gift, realizado){
  let [rows, fields]  = await database.con.execute('INSERT INTO fidelidade (cupom, fk_cliente, utilizado) VALUES (?, ?, ?)', [gift, id, realizado]);

  return rows;
}
database.insertUltimo = async function(sessionid, placa){
  let [rows, fields]  = await database.con.execute('INSERT INTO ultimosagendamentos (fk_cliente, fk_placa, dataultimo) VALUES (?, ?, NOW())', [sessionid, placa]);

  return rows;
}
database.getUltimo = async function(sessionid, placa){
  let [rows, fields]  = await database.con.execute('SELECT * FROM ultimosagendamentos WHERE fk_cliente = ? AND fk_placa = ?', [sessionid, placa]);

  return rows;
}
database.putUltimo = async function(id){
  let [rows, fields]  = await database.con.execute('UPDATE ultimosagendamentos SET dataultimo = NOW() WHERE id = ?', [id]);

  return rows;
}
database.putFidelidades = async function(idfidelidade){
  let [data] = await database.con.execute('UPDATE fidelidade SET utilizado = 1 where id = ?', [idfidelidade]);

   return data;
}

export default database;