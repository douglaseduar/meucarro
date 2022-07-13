let iddoagendamento = location.search;
let idaux = iddoagendamento.split("=");
let idmesmo = idaux[1];

carregarDadosAgendamento(idmesmo);

function carregarDadosAgendamento(idmesmo){
    fetch('/editagenderadmin/'+ idmesmo)
    .then((res) => res.json())
    .then((res) => {
        for(agendamento of res){
            preencheformulario(agendamento.id, agendamento.placa, agendamento.oleo, agendamento.obeservacao, agendamento.data, agendamento.filtro_oleo, agendamento.filtro_ar, agendamento.filtro_arcondicionado, agendamento.filtro_gasolina, agendamento.filtro_hidraulico, agendamento.filtro_racor);
        }

    })
    
}
function preencheformulario(id, vplaca, voleo, vobservacao, vdata, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor ){
    let form = document.querySelector("#agendamento");
  
    if(voleo != undefined){
        form.oleo.value = voleo;
    }
    if(vobservacao != undefined){
        form.observacao.value = vobservacao;
    }
    if(filtro_oleo == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox1").checked = true;
    }
    if(filtro_ar == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox2").checked = true;
    }
    if(filtro_gasolina == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox3").checked = true;
    }
    if(filtro_arcondicionado == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox4").checked = true;
    }
    if(filtro_racor == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox5").checked = true;
    }
    if(filtro_hidraulico == '<i class="bi bi-check-lg"></i>'){
        document.querySelector("#inlineCheckbox6").checked = true;
    }
    form.vdata.value = vdata;
    var option = document.createElement("option");
        option.setAttribute("id", vplaca)
        option.textContent = vplaca
        option.style.textTransform = "uppercase";
        
    
        document.querySelector(".form-select").appendChild(option);

}