document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";


function carregarVeiculos() {
    fetch('/car/')
        .then((res) => res.json())
        .then((res) => {
            for (veiculo of res) {
                criarLinha(veiculo.id_placa, veiculo.placa, veiculo.modelo, veiculo.FK_TIPOS_VEICULO_id_tipo);
            }
        })

}

function criarLinha(vid, vplaca, vmodelo, vtipo) {
    var card = document.createElement("div");
    card.className = "col";
    var card1 = document.createElement("div");
    card1.className = "card h-100";
    var card2 = document.createElement("div");
    card2.className = "card-body";
    var fotoc = document.createElement("i")
    if (vtipo == 1) {
        fotoc.className = "bi bi-car-front-fill";
    } else if (vtipo == 2) {
        fotoc.className = "bi bi-truck";
    } else if (vtipo == 3){
        fotoc.className = "bi bi-cone-striped";
    } else if (vtipo == 4){
        fotoc.className = "bi bi-speedometer";
    }else{
        fotoc.className = "bi bi-truck-front-fill";
    }
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
    titulo.className = "titulo";
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

async function chamarModal() {
    document.querySelector(".modal-dialog").style.display = "none";
    let auxid = this.getAttribute("id");
    await fetch('/cardetalhe/' + auxid)
        .then((res) => res.json())
        .then((res) => {
            for (veiculo1 of res) {
                document.querySelector(".modal-title").textContent = veiculo1.placa;
                document.querySelector(".modal-title").style.textTransform = "uppercase";
                document.querySelector(".modelo1").textContent = "VEÍCULO: " + veiculo1.modelo;
                document.querySelector(".ano").textContent = "ANO/MODELO: " + veiculo1.AnoModelo;
                document.querySelector(".combustivel").textContent = "COMBUSTÍVEL: " + veiculo1.Combustivel;
                document.querySelector(".cc").textContent = "MOTOR: " + veiculo1.cilindradas;
                document.querySelector(".potencia").textContent = "POTÊNCIA: " + veiculo1.potencia + "cv";
                document.querySelector(".cor").textContent = "COR: " + veiculo1.cor;
                document.querySelector(".fipe").textContent = "CÓDIGO FIPE: " + veiculo1.fipe;
                document.querySelector(".valor").textContent = "VALOR: " + veiculo1.valor;
                document.querySelector(".ipva").textContent = "IPVA: " + veiculo1.ipva;
                document.querySelector(".modal-dialog").style.display = "block"


            }

        })

}



async function apagando() {
    var result = confirm("Tem certeza que deseja excluir o veículo e todos os seu agendamentos?");
    if (result == true) {
        let idaux = this.getAttribute("id");

        let header = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }
        let resposta = await fetch('/car/' + idaux, header);
    
        document.location.reload(true);
    }
    
}




carregarVeiculos();

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
    if (foto != "") {
        document.querySelector("#fotomenu").src = foto
    }
    document.querySelector("#nomemenu").textContent = nome;

}

carregarDadosMenu();

document.querySelector("#logout").addEventListener("click", sair);

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