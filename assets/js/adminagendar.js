document.querySelector("#agendar").addEventListener("click", verificarhora);

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
            marcar();
        }

        })
    }}else{
        document.querySelector(".avisando").textContent = "Horário ou Data Inválida/Indisponível";
        document.querySelector(".avisando").style.color = "red";
    }

}


async function marcar() {

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
    aplaca = form.veiculo.value;
    aoleo = form.oleo.value;
    aemail = form.email.value;
    aendereco = form.endereco.value;
    atelefone = form.telefone.value;
    anome = form.nome.value;
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
    if (document.querySelector("#inlineRadio1").checked) {
        atipo = 1;
    } else if (document.querySelector("#inlineRadio2").checked) {
        atipo = 2;
    } else if (document.querySelector("#inlineRadio3").checked) {
        atipo = 3;
    } else if (document.querySelector("#inlineRadio4").checked){
        atipo = 4;
    }else{
        atipo = 5;
    };

    let header = {
        method: 'POST',
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
            placao: aplaca,
            email: aemail,
            nome: anome,
            telefone: atelefone,
            endereco: aendereco,
            tipo: atipo
        })
    }
    fetch('/adminagendar', header);
    location = "/admin";

}

document.querySelector("#flexCheckDefault").addEventListener("click", bloq);

function bloq() {
    if (document.querySelector("#flexCheckDefault").checked) {
        document.querySelector("#nome").disabled = true;
        document.querySelector("#telefone").disabled = true;
        document.querySelector("#endereco").disabled = true;
    } else {
        document.querySelector("#nome").disabled = false;
        document.querySelector("#telefone").disabled = false;
        document.querySelector("#endereco").disabled = false;
    }
}