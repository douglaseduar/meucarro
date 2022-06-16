if(!localStorage.getItem("sessionid")){
    location = "/login"
}

let iddoagendamento = location.search;
let idaux = iddoagendamento.split("=");
let idmesmo = idaux[1];

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

carregarDadosAgendamento(idmesmo);

function carregarDadosAgendamento(idmesmo){
    fetch('/editagender/'+ idmesmo)
    .then((res) => res.json())
    .then((res) => {
        for(agendamento of res){
            preencheformulario(agendamento.id, agendamento.placa, agendamento.oleo, agendamento.obeservacao, agendamento.data, agendamento.filtro_oleo, agendamento.filtro_ar, agendamento.filtro_arcondicionado, agendamento.filtro_gasolina, agendamento.filtro_hidraulico, agendamento.filtro_racor);
        }

    })
    
}

function preencheformulario(id, vplaca, voleo, vobservacao, vdata, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor ){
    let form = document.querySelector("#agendamento");
    if(voleo != undefined){
        form.oleo.value = voleo;
    }
    if(vobservacao != undefined){
        form.observacao.value = vobservacao;
    }
    if(filtro_oleo == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox1").checked = true;
    }
    if(filtro_ar == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox2").checked = true;
    }
    if(filtro_gasolina == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox3").checked = true;
    }
    if(filtro_arcondicionado == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox4").checked = true;
    }
    if(filtro_racor == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox5").checked = true;
    }
    if(filtro_hidraulico == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox6").checked = true;
    }
    form.vdata.value = vdata;
    var option = document.createElement("option");
        option.setAttribute("id", vplaca)
        option.textContent = vplaca
        option.style.textTransform = "uppercase";
        
    
        document.querySelector(".form-select").appendChild(option);

}
document.querySelector("#dropagendar").addEventListener("click", drop);

async function drop(event){
    event.preventDefault();

    let idcliente = localStorage.getItem("id");
    fetch('/user/'+ idcliente)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            enviaracancelamento(cliente.telefone);
        }

    })
}
async function enviaracancelamento(telefone){ 
    form = document.querySelector("#agendamento");
    adata = form.vdata.value;
    aplaca = form.select.value;
    let header = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({           
            telefone: telefone,
            placa: aplaca,
            vdata: adata
        })
    }
    let resposta = await fetch('/editagender/' + idmesmo, header);
    location = "/historico";
    
}


// function carregarVeiculos(id){
//     fetch('/car/'+ id)
//     .then((res) => res.json())
//     .then((res) => {
//         for(veiculo of res){
//             criarLinha(veiculo.placa, veiculo.id);
//         }
//     })
    
// }

// function criarLinha (vplaca, vid){
//     var option = document.createElement("option");
//     option.setAttribute("value", vid)
//     option.textContent = vplaca
//     option.style.textTransform = "uppercase";
    

//     document.querySelector(".form-select").appendChild(option);
// }

// document.querySelector('#agendar').addEventListener("click", verificarData);

// function verificarData(event){
//     event.preventDefault();

//     var form = document.querySelector('#agendamento');
//     let vdata = form.vdata.value;
//     console.log(vdata);
// }
//carregarVeiculos(1);

document.querySelector("#logout").addEventListener("click", sair)

function sair(){
    localStorage.removeItem("id");
    localStorage.removeItem("sessionid");
    location = "/login";
}

document.querySelector("#agendar").addEventListener("click", editaragendando)

async function editaragendando(event){
    event.preventDefault();

    let idcliente = localStorage.getItem("id");
    fetch('/user/'+ idcliente)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            enviaredicao(cliente.telefone, idcliente);
        }

    })
}    
async function enviaredicao(telefone, idcliente){   
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
    auxplacao = form.select.selectedOptions;
    placao = auxplacao[0].getAttribute("id");
    aoleo = form.oleo.value;
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
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({           
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
        placao: placao,
        telefone: telefone
    })
}
let resposta = await fetch('/editagender/' + idmesmo, header);
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