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
   let [rows, fields] = await database.con.execute('SELECT * FROM veiculo WHERE id = ?', [id]);
    
    return rows;
}
database.deleteVeiculo = async function(id){
    let [data] = await database.con.execute('DELETE FROM veiculo WHERE id = ?', [id]);

    return {'deletado': id}
}


database.getProdutosSelecionado = async function(id){
  //  let [rows, fields] = await database.con.execute('SELECT * FROM produtos WHERE id = ?', [id]);

   // return rows;
}
database.insertProduto = async function(titulo, descricao, img, preco){
 //  let [data] = await database.con.execute('INSERT INTO produtos (titulo, descricao, img, preco) VALUES (?, ?, ?, ?)', 
  //  [titulo, descricao, img, preco]);

  //  return {'numero': data.insertId}
}
database.deleteProduto = async function(id){
  //  let [data] = await database.con.execute('DELETE FROM produtos WHERE id = ?', [id]);

  //  return {'deletado': id}
}
database.editProduto = async function(titulo, descricao, img, preco, id){
  //  let [data] = await database.con.execute('UPDATE produtos SET titulo = ?, descricao = ?, img = ?, preco = ? WHERE id = ?', [titulo, descricao, img, preco, id]);

  //  return {'alterado': id}
}

export default database;