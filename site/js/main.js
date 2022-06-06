document.querySelector('#add').addEventListener("click", adicionar);



async function adicionar(){
    let form = document.querySelector('#form');
    let titulo = form.titulo.value;
    let descricao = form.descricao.value;
    let img = form.img.value;
    let preco = form.preco.value;

    let numero = await adicionarPessoaBD(titulo, descricao, img, preco);

}

async function adicionarPessoaBD(titulo, descricao, img, preco){
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({           
            titulo: titulo,
            descricao: descricao,
            img: img,
            preco: preco    
        })
    }
    let resposta = await fetch('/produtos', header);
    resposta = await resposta.json();

    return resposta.numero;
    
}

function criarLinha (formNumero, formTitulo, formDescricao, formImg, formPreco){
    let linha = document.createElement('tr');
    let numero = document.createElement('td');
    let titulo = document.createElement('td');
    let descricao = document.createElement('td');
    let img = document.createElement('td');
    let preco = document.createElement('td');
    let simbolo = document.createElement('td');
    let simbolo1 = document.createElement('td');

    numero.textContent = formNumero;
    titulo.textContent = formTitulo;
    descricao.textContent = formDescricao;
    img.innerHTML = '<a target="_blank" href=' + formImg + '><i class="bi bi-card-image"></i></a>';
    preco.textContent = 'R$ ' + formPreco + ',00';
    simbolo.innerHTML= '<i class="bi bi-pencil-fill botao">';
    simbolo1.innerHTML = '</i><i class="bi bi-x-lg"></i>';
    simbolo.setAttribute("id", formNumero);
    simbolo1.setAttribute("id", formNumero);
    simbolo.addEventListener("click", editarProduto);
    simbolo1.addEventListener("click", excluirProduto);

    linha.appendChild(numero);
    linha.appendChild(titulo);
    linha.appendChild(descricao);
    linha.appendChild(preco);
    linha.appendChild(img);
    linha.appendChild(simbolo);
    linha.appendChild(simbolo1);

    document.querySelector("tbody").appendChild(linha);
}

async function alterarbd(){
    let form = document.querySelector('#form');
    let titulo = form.titulo.value;
    let descricao = form.descricao.value;
    let img = form.img.value;
    let preco = form.preco.value;
    let id = form.id.value;
    let header = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({           
            titulo: titulo,
            descricao: descricao,
            img: img,
            preco: preco   
        })
    }
    let resposta = await fetch('/produtos/' + id, header);
    resposta = await resposta.json();

    return resposta.numero;
}

async function editarProduto(){
    let idaux = this.getAttribute("id");
    carregarProdutosSelecionados(idaux);
    document.querySelector('#add').textContent = "Alterar";
    document.querySelector('#add').removeEventListener("click", adicionar);
    document.querySelector('#add').addEventListener("click", alterarbd);

    //let form = document.querySelector('#form');
    //form.titulo.value = document.querySelector('tbody').;

}
function addform(id, titulo, descricao, img, preco){
    let form = document.querySelector('#form');
    form.titulo.value = titulo
    form.descricao.value = descricao;
    form.img.value = img;
    form.preco.value = preco;
    form.id.value = id;
}

async function excluirProduto(){
    let idaux = this.getAttribute("id");
    console.log(idaux);
    let header = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    let resposta = await fetch('/produtos/' + idaux, header);

    console.log("Produto com id " + idaux + " deletado com sucesso!")
    document.location.reload(true);
}

function carregarProdutosSelecionados(id){
    fetch('/produt/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(produto of res){
            addform(produto.id, produto.titulo, produto.descricao, produto.img, produto.preco);
        }
        //  let conteudo = {id: res.id, titulo: res.titulo, descricao: res.descricao, img: res.img, preco: res.preco};
      //  return conteudo;
    })
    
}

function carregarProdutos(){
    fetch('/produtos')
    .then((res) => res.json())
    .then((res) => {
        for(produto of res){
            criarLinha(produto.id, produto.titulo, produto.descricao, produto.img, produto.preco);
        }
    })
}

carregarProdutos()