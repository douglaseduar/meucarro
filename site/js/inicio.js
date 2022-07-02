
document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";
// data();

// function data(){
//     monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")
//     var data = new Date();
//     var dia = String(data.getDate()).padStart(2, '0');
//     let dataAtual = dia + " de " + monName [data.getMonth() ]   +  " de "  +     data.getFullYear ()
    
// }

function carregarDadosMenu(id){
    fetch('/user/'+ id)
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

carregarDadosMenu(localStorage.getItem("id"));


document.querySelector("#logout").addEventListener("click", sair)

function sair(){
    location = "/login";
}
