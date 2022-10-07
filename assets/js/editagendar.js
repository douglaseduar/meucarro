let iddoagendamento = location.search;
let idaux = iddoagendamento.split("=");
let idmesmo = idaux[1];
var datadoagendamento = "";
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
            if(res == ![]){
                location = "/historico";
            }
            let datacomparacao = new Date(res[0].data);
            let dataaux = new Date();
            if(datacomparacao.getDate() == dataaux.getDate() && datacomparacao.getHours() > dataaux.getHours()-2){
                location = "/historico";
            }else{
            for (agendamento of res) {
                preencheformulario(agendamento.id_agendamento, agendamento.placa, agendamento.oleo, agendamento.observacao, agendamento.data, agendamento.filtro_oleo, agendamento.filtro_ar, agendamento.filtro_arcondicionado, agendamento.filtro_gasolina, agendamento.filtro_hidraulico, agendamento.filtro_racor);
            }

        }})

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
    datadoagendamento = vdata;
    let datac = vdata.split("T");
    let dataco = datac[0].split("-");
    let adata = dataco[2] + "/" + dataco[1] + "/" + dataco[0] + " " + datac[1]; 

    form.vdata.value = adata;
    var option = document.createElement("option");
    option.setAttribute("id", vplaca)
    option.textContent = vplaca
    option.style.textTransform = "uppercase";


    document.querySelector(".form-select").appendChild(option);

}
document.querySelector("#dropagendar").addEventListener("click", enviaracancelamento);

async function enviaracancelamento(event) {
    event.preventDefault();

    var result = confirm("Tem certeza que deseja excluir o agendamento?");
    if (result == true) {
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
        fetch('/editagender/' + idmesmo, header);
        location = "/historico";
    }
}


document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
}

document.querySelector("#agendar").addEventListener("click", verificarhora)

async function verificarhora(event) {
    event.preventDefault();
    form = document.querySelector("#agendamento");
    let fdata = form.vdata.value;
    let datac = fdata.split(" ");
    let dataco = datac[0].split("/");
    let hora = datac[1].split(":");
    let adata = dataco[2] + "-" + dataco[1] + "-" + dataco[0] + "T" + datac[1]; 
    let minha_data = new Date(adata);
    let data_atual = new Date();
    if( hora[0] <= 18 && hora[0] >= 07 && hora[1] == 00 && minha_data.getDay() != 0 && minha_data.getDay() != 6){
        if(minha_data.getDate() == data_atual.getDate() && minha_data.getHours() < data_atual.getHours()){
            document.querySelector(".avisando").textContent = "Horário ou Data Inválida/Indisponível";
            document.querySelector(".avisando").style.color = "red";
        }else{
       await fetch('/horario/' + adata)
        .then((res) => res.json())
        .then((res) => {
        let verificacao = res[0].livre;
        if(datadoagendamento == adata){
            enviaredicao();
        }
        else if(verificacao == 0){
            let apdata = new Date(res[0].possivelhorario);
            document.querySelector(".avisando").textContent = "Horário Indisponível. Próximo horário livre é:" + apdata.getDate() + "/" + (apdata.getMonth() + 1) + "/" + apdata.getFullYear() + " às " + apdata.getHours() + ":00";
            document.querySelector(".avisando").style.color = "orange";
        }else if(verificacao == 2){
            document.querySelector(".avisando").textContent = "Não temos mais horário disponível para essa data após o horário solicitado";
            document.querySelector(".avisando").style.color = "orange";
        }else{
            enviaredicao();
        }

        })
    }}else{
        document.querySelector(".avisando").textContent = "Horário ou Data Inválida/Indisponível";
        document.querySelector(".avisando").style.color = "red";
    }

}




async function enviaredicao() {


    let aobservacao = "";
    let aoleo = '<i class="bi bi-check-lg"></i>';
    let afiltrooleo = "";
    let afiltroar = "";
    let afiltroarc = "";
    let afiltrocomb = "";
    let afiltrohidraulico = "";
    let afiltrosep = "";

    form = document.querySelector("#agendamento");
    let fdata = form.vdata.value;
    let datac = fdata.split(" ");
    let dataco = datac[0].split("/");
    let adata = dataco[2] + "-" + dataco[1] + "-" + dataco[0] + "T" + datac[1]; 
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
    await fetch('/editagender/' + idmesmo, header);

    location = "/historico";

}