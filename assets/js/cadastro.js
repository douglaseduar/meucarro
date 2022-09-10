document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";

document.querySelector("#cadastrar").addEventListener("click", cadastrando);
var aux = 0;

async function cadastrando(event) {
    event.preventDefault();
    document.querySelector("body").style.opacity = 0.5
    let form = document.querySelector('#formcadastro');
    placa = form.consultaplaca.value
    if (document.querySelector("#inlineRadio1").checked) {
        aux = 1;
    } else if (document.querySelector("#inlineRadio2").checked) {
        aux = 2;
    } else if (document.querySelector("#inlineRadio3").checked) {
        aux = 3;
    } else if (document.querySelector("#inlineRadio4").checked){
        aux = 4;
    }else{
        aux = 5;
    };

    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            placa: placa,
            tipo: aux
        })
    }
    let respostav = await fetch('/car', header);


    location = "/veiculos";

}

function carregarDadosMenu() {
    fetch('/user/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                preencherMenu(cliente.nome, cliente.foto);
            }

        })

}

function preencherMenu(nome, foto) {
    document.querySelector("#fotomenu").src = foto
    document.querySelector("#nomemenu").textContent = nome;

}

carregarDadosMenu();

document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
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