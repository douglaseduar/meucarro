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
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id = a.fk_placa and a.fk_cliente = ?', [id]);
   
   return rows;
}
database.geteditAgendamento = async function(id){
  let [rows, fields] = await database.con.execute('select a.*, v.placa, v.modelo from agendamento a, veiculo v where v.id = a.fk_placa and a.id = ?', [id]);
   
   return rows;
}
database.getAgendamentoadmin = async function(){
  let [rows, fields] = await database.con.execute('SELECT * FROM agendamento');
   
   return rows;
}
database.getDados = async function(id){
  let [rows, fields] = await database.con.execute('SELECT id, nome, telefone, email, endereco, foto, fidelidade FROM cliente WHERE id = ?', [id]);
   
   return rows;
}

database.insertVeiculo = async function(placa, resposta, cliente, tipo, AnoModelo, Combustivel, cilindradas, potencia, cor){
 let [data] = await database.con.execute('INSERT INTO veiculo (placa, modelo, fk_cliente, tipo, AnoModelo, Combustivel, cilindradas, potencia, cor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [placa, resposta, cliente, tipo, AnoModelo, Combustivel, cilindradas, potencia, cor]);

  return {'numero': data.insertId}
}
database.insertAgendamento = async function(fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente){
  let [data] = await database.con.execute('INSERT INTO agendamento (fk_placa, obeservacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, data, realizado, fk_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
     [fk_placa, observacao, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, vdata, realizado, fk_cliente]);
 
   return {'numero': data.insertId}
 }
database.insertUser = async function(nome, telefone, permicao, email, senha, fidelidade, verificacao){
  let [data] = await database.con.execute('INSERT INTO cliente (nome, telefone, permicao, email, senha, fidelidade, verificacao) VALUES (?, ?, ?, ?, ?, ?, ?)', 
     [nome, telefone, permicao, email, senha, fidelidade, verificacao]);
 
   return {'numero': data.insertId}
 }
 
database.editUser = async function(nome, telefone, email, foto, endereco, id){
   let [data] = await database.con.execute('UPDATE cliente SET nome = ?, telefone = ?, email = ?, foto = ?, endereco = ? WHERE id = ?', [nome, telefone, email, foto, endereco, id]);

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
database.getLogin = async function(email){
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

export default database;