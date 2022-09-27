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
            if(res.length == 0){
                document.querySelector(".form-select").remove();
                var option = document.createElement("button");
                option.textContent = "ADICIONE UM VEÍCULO PRIMEIRO";
                option.className = "btn btn-success";
                option.addEventListener("click", cadastrou);
                document.querySelector(".teste").appendChild(option);
                document.querySelector("#agendar").style.display = "none";
            }else{
            for (veiculo of res) {
                criarLinha(veiculo.placa, veiculo.id_placa);
            }}
        })

}
function cadastrou(event){
    event.preventDefault();

    location = "/cadastro-de-veiculo";
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
        if(verificacao == 0){
            let apdata = new Date(res[0].possivelhorario);  
            document.querySelector(".avisando").textContent = "Horário Indisponível. Próximo horário livre é:" + apdata.getDate() + "/" + apdata.getMonth() + "/" + apdata.getFullYear() + " às " + apdata.getHours() + ":00";
            document.querySelector(".avisando").style.color = "orange";
        }else if(verificacao == 2){
            document.querySelector(".avisando").textContent = "Não temos mais horário disponível para essa data após o horário solicitado";
            document.querySelector(".avisando").style.color = "orange";
        }else{
            enviaragendamento();
        }

        })
    }}else{
        document.querySelector(".avisando").textContent = "Horário ou Data Inválida/Indisponível";
        document.querySelector(".avisando").style.color = "red";
    }

}

async function enviaragendamento() {
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