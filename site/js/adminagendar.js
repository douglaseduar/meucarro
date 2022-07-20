document.querySelector("#agendar").addEventListener("click", marcar);

async function marcar(event){
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
        aplaca = form.veiculo.value;
        aoleo = form.oleo.value;
        aemail = form.email.value;
        aendereco = form.endereco.value;
        atelefone = form.telefone.value;
        anome = form.nome.value;
        if(document.querySelector("#inlineCheckbox1").checked){
        afiltrooleo = '<i class="bi bi-check-lg"></i>';
        }
        if(document.querySelector("#inlineCheckbox2").checked){
            afiltroar = '<i class="bi bi-check-lg"></i>';
            }
        if(document.querySelector("#inlineCheckbox3").checked){
                afiltrocomb = '<i class="bi bi-check-lg"></i>';
        }
        if(document.querySelector("#inlineCheckbox4").checked){
            afiltroarc = '<i class="bi bi-check-lg"></i>';
    }    
    if(document.querySelector("#inlineCheckbox5").checked){
        afiltrosep = '<i class="bi bi-check-lg"></i>';
    }
    if(document.querySelector("#inlineCheckbox6").checked){
        afiltrohidraulico = '<i class="bi bi-check-lg"></i>';
    }
    if(document.querySelector("#inlineRadio1").checked){
        atipo = 1;
    }else if(document.querySelector("#inlineRadio2").checked){
        atipo = 2;
    }
    else if(document.querySelector("#inlineRadio3").checked){
        atipo = 3;
    }
    else{atipo = 4};

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

function bloq(){
    if(document.querySelector("#flexCheckDefault").checked){
        document.querySelector("#nome").disabled = true;
        document.querySelector("#telefone").disabled = true;
        document.querySelector("#endereco").disabled = true;
    }else{
        document.querySelector("#nome").disabled = false;
        document.querySelector("#telefone").disabled = false;
        document.querySelector("#endereco").disabled = false;
    }
}