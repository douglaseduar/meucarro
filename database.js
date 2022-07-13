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
  let [rows, fields] = await database.con.execute('SELECT ag.*, v.placa, v.modelo, c.nome, c.sessionid FROM agendamento ag, veiculo v, cliente c WHERE v.id = ag.fk_placa AND c.sessionid = ag.fk_cliente AND v.placa = ? ORDER BY realizado = 1, ag.data', [pesquisa]);
   
   return rows;
}
database.getAgendamentoadminhoje = async function(){
  let [rows, fields] = await database.con.execute('SELECT ag.*, v.placa, v.modelo, c.nome FROM agendamento ag, veiculo v, cliente c WHERE v.id = ag.fk_placa AND c.sessionid = ag.fk_cliente ORDER BY ag.data');
   
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
database.insertUser = async function(nome, telefone, permicao, sessionid, email, endereco, foto, fidelidade, ){
  let [data] = await database.con.execute('INSERT INTO cliente (nome, telefone, permicao, sessionid, email, endereco, foto, fidelidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
     [nome, telefone, permicao, sessionid, email, endereco, foto, fidelidade]);
 
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
database.deleteAgendamento = async function(id){
  let [data] = await database.con.execute('DELETE FROM agendamento WHERE id = ?', [id]);

  return {'deletado': id}
}
database.getVeiculosdetalhe = async function(id){
  let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE placa = ?', [id]);
   
   return rows;
}
database.getLogin = async function(sessionid){
  let [rows, fields] = await database.con.execute('SELECT * FROM cliente WHERE sessionid = ?', [sessionid]);
   
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
  let [rows, fields]  = await database.con.execute('SELECT f.*, c.nome, c.sessionid FROM fidelidade f, cliente c where f.fk_cliente = c.sessionid');

  return rows;
}

database.insertFidelidade = async function(id, gift, realizado){
  let [rows, fields]  = await database.con.execute('INSERT INTO fidelidade (cupom, fk_cliente, utilizado) VALUES (?, ?, ?)', [gift, id, realizado]);

  return rows;
}
database.putFidelidades = async function(idfidelidade){
  let [data] = await database.con.execute('UPDATE fidelidade SET utilizado = 1 where id = ?', [idfidelidade]);

   return data;
}

export default database;