let iddoagendamento = location.search;
let idaux = iddoagendamento.split("=");
let idmesmo = idaux[1];

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

carregarDadosAgendamento(idmesmo);

function carregarDadosAgendamento(idmesmo) {
    fetch('/editagender/' + idmesmo)
        .then((res) => res.json())
        .then((res) => {
            for (agendamento of res) {
                preencheformulario(agendamento.id, agendamento.placa, agendamento.oleo, agendamento.obeservacao, agendamento.data, agendamento.filtro_oleo, agendamento.filtro_ar, agendamento.filtro_arcondicionado, agendamento.filtro_gasolina, agendamento.filtro_hidraulico, agendamento.filtro_racor);
            }

        })

}

function preencheformulario(id, vplaca, voleo, vobservacao, vdata, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor) {
    let form = document.querySelector("#agendamento");

    if (voleo != undefined) {
        form.oleo.value = voleo;
    }
    if (vobservacao != undefined) {
        form.observacao.value = vobservacao;
    }
    if (filtro_oleo == '<i class="bi bi-check-lg"></i>') {
        document.querySelector("#inlineCheckbox1").checked = true;
    }
    if (filtro_ar == '<i class="bi bi-check-lg"></i>') {
        document.querySelector("#inlineCheckbox2").checked = true;
    }
    if (filtro_gasolina == '<i class="bi bi-check-lg"></i>') {
        document.querySelector("#inlineCheckbox3").checked = true;
    }
    if (filtro_arcondicionado == '<i class="bi bi-check-lg"></i>') {
        document.querySelector("#inlineCheckbox4").checked = true;
    }
    if (filtro_racor == '<i class="bi bi-check-lg"></i>') {
        document.querySelector("#inlineCheckbox5").checked = true;
    }
    if (filtro_hidraulico == '<i class="bi bi-check-lg"></i>') {
        document.querySelector("#inlineCheckbox6").checked = true;
    }
    form.vdata.value = vdata;
    var option = document.createElement("option");
    option.setAttribute("id", vplaca)
    option.textContent = vplaca
    option.style.textTransform = "uppercase";


    document.querySelector(".form-select").appendChild(option);

}
document.querySelector("#dropagendar").addEventListener("click", enviaracancelamento);

async function enviaracancelamento(event) {
    event.preventDefault();

    form = document.querySelector("#agendamento");
    adata = form.vdata.value;
    aplaca = form.select.value;
    let header = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            placa: aplaca,
            vdata: adata
        })
    }
    let resposta = await fetch('/editagender/' + idmesmo, header);
    location = "/historico";

}


document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
}

document.querySelector("#agendar").addEventListener("click", enviaredicao)

async function enviaredicao(event) {
    event.preventDefault()


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
            placao: placao,
        })
    }
    let resposta = await fetch('/editagender/' + idmesmo, header);

    location = "/historico";

}