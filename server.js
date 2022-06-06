import express from 'express';
import database from './database.js';
import url from 'url';
import path from 'path';
import fileupload from 'express-fileupload'

const app = express();
var __filename = url.fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

 app.listen(8080, () => console.log('Servidor rodando!'));

app.use((req, res, next) => {
    console.log(req.url);
    next();
})
app.use(fileupload());
app.use(express.json());
app.use(express.static('site/css'));
app.use(express.static('site/js'));
app.use(express.static('site/img'));

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





 app.get('/produtos', async(req, res) => {
    res.send(await database.getProdutos());
})
app.get('/produt/:id', async(req, res) => {
    res.send(await database.getProdutosSelecionado(req.params.id));
})


app.delete('/produtos/:id', async (req, res) => {
    database.deleteProduto(req.params.id);
    res.send('Produto com o id: ' + req.params.id + ' deletado com sucesso')
})

app.post('/produtos', async (req, res) => {
    let {titulo, descricao, img, preco} = req.body;
    res.status(201).send(await database.insertProduto(titulo, descricao, img, preco));
})

app.put('/produtos/:id', async (req, res) => {
    let {titulo, descricao, img, preco} = req.body;
    res.status(201).send(await database.editProduto(titulo, descricao, img, preco, req.params.id));
})

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: ''
// })

// con.connect((err => {
//     if(err) throw err;
//     console.log('Conectado com sucesso!')
// }))

// con.end();