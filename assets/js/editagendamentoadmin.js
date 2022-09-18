let iddoagendamento = location.search;
let idaux = iddoagendamento.split("=");
let idmesmo = idaux[1];

carregarDadosAgendamento(idmesmo);

function carregarDadosAgendamento(idmesmo) {
    fetch('/editagenderadmin/' + idmesmo)
        .then((res) => res.json())
        .then((res) => {
            for (agendamento of res) {
                preencheformulario(agendamento.id, agendamento.placa, agendamento.oleo, agendamento.observacao);
            }

        })

}

function preencheformulario(id, vplaca, voleo, vobservacao) {
    let form = document.querySelector("#agendamento");
    document.querySelector("#agendamento").action = "/editagenderadmin/" + idmesmo;

    if (voleo != undefined) {
        form.oleo.value = voleo;
    }
    if (vobservacao != undefined) {
        form.observacao.value = vobservacao;
    }
    var option = document.createElement("option");
    option.setAttribute("id", vplaca)
    option.textContent = vplaca
    option.style.textTransform = "uppercase";


    document.querySelector(".form-select").appendChild(option);

}

document.querySelector("#dropagendar").addEventListener("click", ausente);

async function ausente(event) {
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

document.querySelector("#agendar").addEventListener("click", concluir);

async function concluir(event) {
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
    let trocado = form.trocador.value;
    let msg = fob + " | " + trocado
    var formao = new FormData()
    formao.append('foto', form.foto.files[0]);
    formao.append('observacao', msg);
    formao.append('oleo', foleo);
    formao.append('filtro_oleo', ffoleo);
    formao.append('filtro_ar', far);
    formao.append('filtro_arcondicionado', farc);
    formao.append('filtro_gasolina', fcomb);
    formao.append('filtro_hidraulico', foutro);
    formao.append('filtro_racor', fseparador);
    formao.append('km', fkm);

    let header = {
        method: 'PUT',
        body: formao
    }


    await fetch('/editagenderadmin/' + idmesmo, header);
    location = '/admin';

}