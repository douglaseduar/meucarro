document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";

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

function carregarVeiculos() {
    fetch('/car/')
        .then((res) => res.json())
        .then((res) => {
            for (veiculo of res) {
                criarLinha(veiculo.placa, veiculo.id_placa);
            }
        })

}

function criarLinha(vplaca, vid) {
    var option = document.createElement("option");
    option.setAttribute("value", vid)
    option.textContent = vplaca
    option.setAttribute("id", vplaca)
    option.style.textTransform = "uppercase";


    document.querySelector(".form-select").appendChild(option);
}

carregarVeiculos();

document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
}


document.querySelector("#agendar").addEventListener("click", enviaragendamento)

async function enviaragendamento(event) {
    event.preventDefault();

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
    if (document.querySelector("#inlineCheckbox1").checked) {
        afiltrooleo = '<i class="bi bi-check-lg"></i>';
    }
    if (document.querySelector("#inlineCheckbox2").checked) {
        afiltroar = '<i class="bi bi-check-lg"></i>';
    }
    if (document.querySelector("#inlineCheckbox3").checked) {
        afiltrocomb = '<i class="bi bi-check-lg"></i>';
    }
    if (document.querySelector("#inlineCheckbox4").checked) {
        afiltroarc = '<i class="bi bi-check-lg"></i>';
    }
    if (document.querySelector("#inlineCheckbox5").checked) {
        afiltrosep = '<i class="bi bi-check-lg"></i>';
    }
    if (document.querySelector("#inlineCheckbox6").checked) {
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
            placao: placao
        })
    }
    await fetch('/agender', header);

    location = "/historico";

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