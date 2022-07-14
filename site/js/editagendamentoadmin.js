let iddoagendamento = location.search;
let idaux = iddoagendamento.split("=");
let idmesmo = idaux[1];

carregarDadosAgendamento(idmesmo);

function carregarDadosAgendamento(idmesmo){
    fetch('/editagenderadmin/'+ idmesmo)
    .then((res) => res.json())
    .then((res) => {
        for(agendamento of res){
            preencheformulario(agendamento.id, agendamento.placa, agendamento.oleo, agendamento.obeservacao);
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
    var option = document.createElement("option");
        option.setAttribute("id", vplaca)
        option.textContent = vplaca
        option.style.textTransform = "uppercase";
        
    
        document.querySelector(".form-select").appendChild(option);

}

document.querySelector("#agendar").addEventListener("click", concluir);
document.querySelector("#dropagendar").addEventListener("click", ausente);

async function ausente(event){ 
    event.preventDefault();
    let header = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    let resposta = await fetch('/editagenderadmin/' + idmesmo, header);
    location = "/admin";

        
}



async function concluir(event){ 
    event.preventDefault();

    var form = document.querySelector("#agendamento");

    let ffoleo = form.filtroo.value;
    let far = form.filtroar.value;
    let fcomb = form.filtrocomb.value;
    let farc = form.filtroarc.value;
    let fseparador = form.filtroracor.value;
    let foutro = form.outrofiltro.value;
    let foleo = form.oleo.value;
    let fkm = form.km.value;
    let fob = form.observacao.value;
    var formao = new FormData()
    formao.append('files', form.foto.files[0]);
    formao.append('observacao', fob)

    let header = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: formao//JSON.stringify({           
        //     observacao: fob,
        //     oleo: foleo,
        //     filtro_oleo: ffoleo,
        //     filtro_ar: far,
        //     filtro_arcondicionado: farc,
        //     filtro_gasolina: fcomb,
        //     filtro_hidraulico: foutro,
        //     filtro_racor: fseparador,
        //     km: fkm,
        //     foto: ffoto
        // })
    }
console.log(formao)


    let resposta9 = await fetch('/editagenderadmin/' + idmesmo, header);
    location = "/admin";

}