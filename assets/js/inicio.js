function fmarquee(ver){
    if(ver == "verdade"){
        document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";
    }else{
        document.querySelector("marquee").textContent = "Adicione seu número do WhatsApp para receber todos os avisos do sistema!";
        document.querySelector("marquee").style.color = "white";
        document.querySelector("marquee").style.height = "30px";
        document.querySelector("marquee").style.background = "green";
    }
}

function carregarDadosMenu() {
    fetch('/user/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                preencherMenu(cliente.nome, cliente.foto, cliente.qtd_fidelidade, cliente.telefone);
            }

        })

}

function preencherMenu(nome, foto, fidelidade, telefone) {
    var aux = 5;
    var aux1 = 0;
    if (foto != "") {
        document.querySelector("#fotomenu").src = foto
    }
    document.querySelector("#nomemenu").textContent = nome;
    for (var i = 0; i < fidelidade; i++) {
        if(aux1 < 5){
        var check = document.createElement("i");
        check.className = 'bi bi-check-circle-fill';
        check.style.color = "green";
        document.querySelector(".premios").appendChild(check)
        aux--;
        aux1++;
    }}
    for (var i = 0; i < aux; i++) {
        var checkn = document.createElement("i");
        checkn.className = 'bi bi-dash-circle-fill';
        checkn.style.color = "grey";
        document.querySelector(".premios").appendChild(checkn)
    }
    var gift = document.createElement("i");
    gift.className = "bi bi-gift-fill";
    gift.style.color = "grey";
    if (fidelidade >= 5) {
        gift.style.color = "cyan";
        document.querySelector("#gift").style.display = "block";

    }
    if(telefone == ""){
        fmarquee("1");
    }else{
        fmarquee("verdade")
    }
    document.querySelector(".premios").appendChild(gift)

}

carregarDadosMenu();


document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
}

document.querySelector("#gift").addEventListener("click", reivindicar);

function reivindicar() {
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    fetch('/present', header)
        .then((res) => res.json())
        .then((res) => {
            for (fidelidade of res) {
                preencherfidelidade(fidelidade.cod);
            }

        })

}

function preencherfidelidade(cod) {
    document.querySelector(".cupom").textContent = cod;
}
carregarnoticias();


function carregarnoticias() {
    fetch('/news')
        .then((res) => res.json())
        .then((res) => {
                for (let i = 0; i < 3; i++) {
                    criarcard(res[i].title, res[i].description, res[i].link, res[i].dataDePublicacao);

                }

            }

        )
}

function criarcard(titulo, resumo, link, data) {

    var card1 = document.createElement("div");
    card1.className = "card p-2 cartao";
    var titulo1 = document.createElement("h4");
    titulo1.className = "card-title";
    titulo1.textContent = titulo;
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

document.querySelector(".menu").addEventListener("click", mn);

function mn(){
    if(document.querySelector(".sidenav").style.display == "block"){
        document.querySelector(".sidenav").style.display = "none";
        document.querySelector(".sidenav").style.maxWidth = "20vw";
        document.querySelector(".content").style.display = "block";   
    }else{
    document.querySelector(".sidenav").style.display = "block";
    document.querySelector(".sidenav").style.maxWidth = "100vw";
    document.querySelector(".content").style.display = "none";
}}