
document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";
// data();

// function data(){
//     monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")
//     var data = new Date();
//     var dia = String(data.getDate()).padStart(2, '0');
//     let dataAtual = dia + " de " + monName [data.getMonth() ]   +  " de "  +     data.getFullYear ()
    
// }

function carregarDadosMenu(){
    fetch('/user/')
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            preencherMenu( cliente.nome, cliente.foto, cliente.fidelidade);
        }

    })
    
}

function preencherMenu(nome, foto, fidelidade){
    var aux = 5;
    if(foto != ""){
    document.querySelector("#fotomenu").src = foto
}
    document.querySelector("#nomemenu").textContent = nome;
    for (var i = 0; i < fidelidade; i++){
        var check = document.createElement("i");
        check.className = 'bi bi-check-circle-fill';
        check.style.color = "green";
        document.querySelector(".premios").appendChild(check)
        aux--;
    }
    for(var i = 0; i < aux; i++){
        var checkn = document.createElement("i");
        checkn.className = 'bi bi-dash-circle-fill';
        checkn.style.color = "grey";
        document.querySelector(".premios").appendChild(checkn)
    }
    var gift = document.createElement("i");
    gift.className = "bi bi-gift-fill";
    gift.style.color = "grey";
    if(fidelidade == 5){
        gift.style.color = "cyan";
        document.querySelector("#gift").style.display = "block";

    }
    document.querySelector(".premios").appendChild(gift)

}

carregarDadosMenu();


document.querySelector("#logout").addEventListener("click", sair)

function sair(){
    location = "/login";
}

document.querySelector("#gift").addEventListener("click", reivindicar);

function reivindicar(){
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }}
    fetch('/present', header)
    .then((res) => res.json())
    .then((res) => {
        for(fidelidade of res){
            preencherfidelidade(fidelidade.cod);
        }

    })
    
}
function preencherfidelidade(cod){
    document.querySelector(".cupom").textContent = cod;
}
carregarnoticias();


function carregarnoticias(){
        fetch('/news')
        .then((res) => res.json())
        .then((res) => {
                for(let i = 0; i<3; i++){
                    criarcard(res[i].title, res[i].description, res[i].link, res[i].dataDePublicacao);

                }
              
            }
    
        )}

function criarcard(titulo, resumo, link, data){

    var card1 = document.createElement("div");
    card1.className = "card p-2 cartao";
   // card1.style.width = "18rem";
    var titulo1 = document.createElement("h4");
    titulo1.className = "card-title";
    titulo1.textContent =  titulo;
    var resumo1 = document.createElement("p");
    resumo1.className = "card-text";
    resumo1.textContent = '"[...]' + resumo + ' [...]"';
    resumo1.style.fontSize = "12pt";
    var link1 = document.createElement("a");
    link1.href = link;
    link1.textContent = "continue lendo.."
    link1.style.fontSize = "12pt";

    card1.appendChild(titulo1);
    card1.appendChild(resumo1);
    card1.appendChild(link1);

    document.querySelector(".lista").appendChild(card1)

}