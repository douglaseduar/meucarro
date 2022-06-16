if(!localStorage.getItem("sessionid")){
    location = "/login"
}


document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";


function carregarVeiculos(id){
    fetch('/car/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            criarLinha(veiculo.id, veiculo.placa, veiculo.modelo, veiculo.tipo);
        }
    })
    
}

function criarLinha (vid, vplaca, vmodelo, vtipo){
    var card = document.createElement("div");
    card.className = "col";
    var card1 = document.createElement("div");
    card1.className = "card h-100";
    var card2 = document.createElement("div");
    card2.className = "card-body";
    var fotoc = document.createElement("i")
    if(vtipo == 1){
        fotoc.className = "bi bi-speedometer2";
    }
    else if(vtipo == 2){
        fotoc.className = "bi bi-truck";
    }
    else {fotoc.className = "bi bi-cone-striped";}
    fotoc.style.fontSize = "70pt";
    var placa = document.createElement("div");
    placa.className = "placa";
    var titulo = document.createElement("h5");
    var modelo = document.createElement("div");
    modelo.className = "modelo";
    var titulo1 = document.createElement("h6");
    var apagar = document.createElement("i");
    apagar.className = "bi bi-x-circle-fill apagar";
    apagar.setAttribute("id", vid);
    apagar.style.color = "red";
    apagar.addEventListener("click", apagando);
    

    titulo.innerHTML = "<b>" + vplaca + "</b>" + " " + '<i class="bi bi-search"></i>';
    titulo.setAttribute("id", vplaca);
    titulo.setAttribute("data-bs-toggle", "modal");
    titulo.setAttribute("data-bs-target", "#staticBackdrop");
    titulo.addEventListener("click", chamarModal);
    titulo.style.cursor = "pointer";
    titulo1.textContent = vmodelo;
    titulo.style.textTransform = "uppercase";
    titulo1.style.textTransform = "uppercase";
    
    card2.appendChild(fotoc);
    card2.appendChild(placa);
    card2.appendChild(titulo);
    card2.appendChild(modelo);
    card2.appendChild(titulo1);
    card2.appendChild(apagar);

    document.querySelector(".lista").appendChild(card).appendChild(card1).appendChild(card2);
}

function chamarModal(){
    let auxid = this.getAttribute("id");
    fetch('/cardetalhe/'+ auxid)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo1 of res){
            document.querySelector(".modal-title").textContent = veiculo1.placa;
            document.querySelector(".modal-title").style.textTransform = "uppercase";
            document.querySelector(".modelo1").textContent = "VEÍCULO: " + veiculo1.modelo;
            document.querySelector(".ano").textContent = "ANO/MODELO: " + veiculo1.AnoModelo;
            document.querySelector(".combustivel").textContent = "COMBUSTÍVEL: " + veiculo1.Combustivel;
            document.querySelector(".cc").textContent = "MOTOR: " + veiculo1.cilindradas;
            document.querySelector(".potencia").textContent = "POTÊNCIA: " + veiculo1.potencia + "cv";
            document.querySelector(".cor").textContent = "COR: " + veiculo1.cor;

        }

    })
    
} 



async function apagando(){
    let idaux = this.getAttribute("id");
   // console.log("Produto com id  deletado com sucesso!")

    let header = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    let resposta = await fetch('/car/' + idaux, header);

   // console.log("Produto com id " + idaux + " deletado com sucesso!")
   document.location.reload(true);
}




carregarVeiculos(localStorage.getItem("id"));

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

document.querySelector("#logout").addEventListener("click", sair)

function sair(){
    localStorage.removeItem("id");
    localStorage.removeItem("sessionid");
    location = "/login";
}
