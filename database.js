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
  let [rows, fields] = await database.con.execute('SELECT * FROM agendamento WHERE fk_cliente = ?', [id]);
   
   return rows;
}
database.getDados = async function(id){
  let [rows, fields] = await database.con.execute('SELECT id, nome, telefone, email, endereco, foto, fidelidade FROM cliente WHERE id = ?', [id]);
   
   return rows;
}

database.insertVeiculo = async function(placa, modelo, cliente, tipo){
 let [data] = await database.con.execute('INSERT INTO veiculo (placa, modelo, fk_cliente, tipo) VALUES (?, ?, ?, ?)', 
    [placa, modelo, cliente, tipo]);

  return {'numero': data.insertId}
}
database.insertUser = async function(nome, telefone, permicao, email, senha, fidelidade){
  let [data] = await database.con.execute('INSERT INTO cliente (nome, telefone, permicao, email, senha, fidelidade) VALUES (?, ?, ?, ?, ?, ?)', 
     [nome, telefone, permicao, email, senha, fidelidade]);
 
   return {'numero': data.insertId}
 }
database.editUser = async function(nome, telefone, email, foto, endereco, id){
   let [data] = await database.con.execute('UPDATE cliente SET nome = ?, telefone = ?, email = ?, foto = ?, endereco = ? WHERE id = ?', [nome, telefone, email, foto, endereco, id]);

    return {'alterado': id}
}

export default database;