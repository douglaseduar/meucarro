
document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";

function carregarDadosMenu(id){
    fetch('/user/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            preencherMenu( cliente.nome, cliente.foto);
        }

    })
    
}

function preencherMenu(nome, foto){
    if(foto != ""){
        document.querySelector("#fotomenu").src = foto
    }
    document.querySelector("#nomemenu").textContent = nome;

}

carregarDadosMenu(localStorage.getItem("id"));

function carregarVeiculos(id){
    fetch('/car/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            criarLinha(veiculo.placa, veiculo.id);
        }
    })
    
}

function criarLinha (vplaca, vid){
    var option = document.createElement("option");
    option.setAttribute("value", vid)
    option.textContent = vplaca
    option.setAttribute("id", vplaca)
    option.style.textTransform = "uppercase";
    

    document.querySelector(".form-select").appendChild(option);
}

// document.querySelector('#agendar').addEventListener("click", verificarData);

// function verificarData(event){
//     event.preventDefault();

//     var form = document.querySelector('#agendamento');
//     let vdata = form.vdata.value;
//     console.log(vdata);
// }
carregarVeiculos(localStorage.getItem("id"));

document.querySelector("#logout").addEventListener("click", sair)

function sair(){
    location = "/login";
}


document.querySelector("#agendar").addEventListener("click", agendando)

async function agendando(event){
    event.preventDefault();

let idcliente = localStorage.getItem("id");
fetch('/user/'+ idcliente)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            enviaragendamento(cliente.telefone, idcliente);
        }

    })
}

async function enviaragendamento(telefone, idcliente ){

let aobservacao = "";
let aoleo = '<i class="bi bi-check-lg"></i>';
let afiltrooleo = "";
let afiltroar = "";
let afiltroarc = "";
let afiltrocomb = "";
let afiltrohidraulico = "";
let afiltrosep = "";

    form = document.querySelector("#agendamento");
    adata = form.vdata.value;
    aobservacao = form.observacao.value;
    aplaca = form.select.value;
    aoleo = form.oleo.value;
    auxplacao = form.select.selectedOptions;
    placao = auxplacao[0].getAttribute("id");
    if(document.querySelector("#inlineCheckbox1").checked){
    afiltrooleo = '<i class="bi bi-check-lg"></i>';
    }
    if(document.querySelector("#inlineCheckbox2").checked){
        afiltroar = '<i class="bi bi-check-lg"></i>';
        }
    if(document.querySelector("#inlineCheckbox3").checked){
            afiltrocomb = '<i class="bi bi-check-lg"></i>';
    }
    if(document.querySelector("#inlineCheckbox4").checked){
        afiltroarc = '<i class="bi bi-check-lg"></i>';
}    
if(document.querySelector("#inlineCheckbox5").checked){
    afiltrosep = '<i class="bi bi-check-lg"></i>';
}
if(document.querySelector("#inlineCheckbox6").checked){
    afiltrohidraulico = '<i class="bi bi-check-lg"></i>';
}

let header = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({           
        fk_placa: aplaca,
        observacao: aobservacao,
        oleo: aoleo,
        filtro_oleo: afiltrooleo,
        filtro_ar: afiltroar,
        filtro_arcondicionado: afiltroarc,
        filtro_gasolina: afiltrocomb,
        filtro_hidraulico: afiltrohidraulico,
        filtro_racor: afiltrosep,
        vdata: adata,
        realizado: 0,
        fk_cliente: idcliente,
        telefone: telefone,
        placao: placao
    })
}
let resposta = await fetch('/agender', header);
resposta = await resposta.json();

location = "/historico";

}








// document.querySelector('#add').addEventListener("click", adicionar);



// async function adicionar(){
//     let form = document.querySelector('#form');
//     let titulo = form.titulo.value;
//     let descricao = form.descricao.value;
//     let img = form.img.value;
//     let preco = form.preco.value;

//     let numero = await adicionarPessoaBD(titulo, descricao, img, preco);

// }

// async function adicionarPessoaBD(titulo, descricao, img, preco){
//     let header = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8'
//         },
//         body: JSON.stringify({           
//             titulo: titulo,
//             descricao: descricao,
//             img: img,
//             preco: preco    
//         })
//     }
//     let resposta = await fetch('/produtos', header);
//     resposta = await resposta.json();

//     return resposta.numero;
    
// }

// function criarLinha (formNumero, formTitulo, formDescricao, formImg, formPreco){
//     let linha = document.createElement('tr');
//     let numero = document.createElement('td');
//     let titulo = document.createElement('td');
//     let descricao = document.createElement('td');
//     let img = document.createElement('td');
//     let preco = document.createElement('td');
//     let simbolo = document.createElement('td');
//     let simbolo1 = document.createElement('td');

//     numero.textContent = formNumero;
//     titulo.textContent = formTitulo;
//     descricao.textContent = formDescricao;
//     img.innerHTML = '<a target="_blank" href=' + formImg + '><i class="bi bi-card-image"></i></a>';
//     preco.textContent = 'R$ ' + formPreco + ',00';
//     simbolo.innerHTML= '<i class="bi bi-pencil-fill botao">';
//     simbolo1.innerHTML = '</i><i class="bi bi-x-lg"></i>';
//     simbolo.setAttribute("id", formNumero);
//     simbolo1.setAttribute("id", formNumero);
//     simbolo.addEventListener("click", editarProduto);
//     simbolo1.addEventListener("click", excluirProduto);

//     linha.appendChild(numero);
//     linha.appendChild(titulo);
//     linha.appendChild(descricao);
//     linha.appendChild(preco);
//     linha.appendChild(img);
//     linha.appendChild(simbolo);
//     linha.appendChild(simbolo1);

//     document.querySelector("tbody").appendChild(linha);
// }

// async function alterarbd(){
//     let form = document.querySelector('#form');
//     let titulo = form.titulo.value;
//     let descricao = form.descricao.value;
//     let img = form.img.value;
//     let preco = form.preco.value;
//     let id = form.id.value;
//     let header = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8'
//         },
//         body: JSON.stringify({           
//             titulo: titulo,
//             descricao: descricao,
//             img: img,
//             preco: preco   
//         })
//     }
//     let resposta = await fetch('/produtos/' + id, header);
//     resposta = await resposta.json();

//     return resposta.numero;
// }

// async function editarProduto(){
//     let idaux = this.getAttribute("id");
//     carregarProdutosSelecionados(idaux);
//     document.querySelector('#add').textContent = "Alterar";
//     document.querySelector('#add').removeEventListener("click", adicionar);
//     document.querySelector('#add').addEventListener("click", alterarbd);

//     //let form = document.querySelector('#form');
//     //form.titulo.value = document.querySelector('tbody').;

// }
// function addform(id, titulo, descricao, img, preco){
//     let form = document.querySelector('#form');
//     form.titulo.value = titulo
//     form.descricao.value = descricao;
//     form.img.value = img;
//     form.preco.value = preco;
//     form.id.value = id;
// }

// async function excluirProduto(){
//     let idaux = this.getAttribute("id");
//     console.log(idaux);
//     let header = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json; charset=UTF-8'
//         }
//     }
//     let resposta = await fetch('/produtos/' + idaux, header);

//     console.log("Produto com id " + idaux + " deletado com sucesso!")
//     document.location.reload(true);
// }

// function carregarProdutosSelecionados(id){
//     fetch('/produt/'+ id)
//     .then((res) => res.json())
//     .then((res) => {
//         for(produto of res){
//             addform(produto.id, produto.titulo, produto.descricao, produto.img, produto.preco);
//         }
//         //  let conteudo = {id: res.id, titulo: res.titulo, descricao: res.descricao, img: res.img, preco: res.preco};
//       //  return conteudo;
//     })
    
// }

// function carregarProdutos(){
//     fetch('/produtos')
//     .then((res) => res.json())
//     .then((res) => {
//         for(produto of res){
//             criarLinha(produto.id, produto.titulo, produto.descricao, produto.img, produto.preco);
//         }
//     })
// }

// carregarProdutos()