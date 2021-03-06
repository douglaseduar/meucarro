function carregarAgendamento() {
    fetch('/agender/')
        .then((res) => res.json())
        .then((res) => {
            for (veiculo of res) {
                criarLinha(veiculo.id, veiculo.fk_placa, veiculo.obeservacao, veiculo.km, veiculo.oleo, veiculo.filtro_oleo, veiculo.filtro_ar, veiculo.filtro_arcondicionado, veiculo.filtro_gasolina, veiculo.filtro_hidraulico, veiculo.filtro_racor, veiculo.data, veiculo.realizado, veiculo.placa, veiculo.modelo, veiculo.foto);
            }
        })

}

function criarLinha(id, fk_placa, observacao, km, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, data1, realizado, vplaca, vmodelo, foto) {
    var card = document.createElement("div");
    card.className = "col";
    var card1 = document.createElement("div");
    card1.className = "card h-100";
    var card2 = document.createElement("div");
    card2.className = "card-body hyst";
    var placa = document.createElement("div");
    placa.className = "placa";
    var placa1 = document.createElement("h5");
    placa1.innerHTML = "<b>" + vplaca + "</b>";
    placa.style.textTransform = "uppercase"
    var modelo = document.createElement("h6");
    modelo.innerHTML = "<i> " + vmodelo + "</i>"
    modelo.style.textTransform = "lowercase";
    var more = document.createElement("div");
    more.className = "more";
    var oleoando = document.createElement("div");
    oleoando.innerHTML = "<b>ÓLEO: </b> " + oleo;
    var kmando = document.createElement("div");
    kmando.innerHTML = "<b>KM: </b>" + km;
    var filtrooleo = document.createElement("div");
    filtrooleo.innerHTML = "<b>FILTRO DE ÓLEO: </b>" + filtro_oleo;
    var filtrocomb = document.createElement("div");
    filtrocomb.innerHTML = "<b>FILTRO DE COMBUSTÍVEL: </b>" + filtro_gasolina;
    var filtroar = document.createElement("div");
    filtroar.innerHTML = "<b>FILTRO DE AR: </b>" + filtro_ar;
    var filtroarc = document.createElement("div");
    filtroarc.innerHTML = "<b>FILTRO DE AR CONDICIONADO: </b>" + filtro_arcondicionado;
    var filtroracor = document.createElement("div");
    filtroracor.innerHTML = "<b>FILTRO SEPARADOR: </b>" + filtro_racor;
    var outrofiltro = document.createElement("div");
    outrofiltro.innerHTML = "<b>OUTRO FILTRO: </b>" + filtro_hidraulico;
    var observando = document.createElement("div");
    observando.className = "observacao";
    observando.textContent = observacao;
    let linkimagem = document.createElement("a");
    let imagemtabela = document.createElement("img");
    var data = document.createElement("div");
    data.className = "data";
    fdata = data1.split("T");
    hora = fdata[1];
    auxdata = fdata[0].split("-");
    data.textContent = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;
    // var tag = document.createElement("div");
    // tag.className = "tag";
    // tag.textContent = "ÚLTIMA TROCA";
    var status = document.createElement("div");
    status.className = "status;"
    if (realizado == 0) {
        status.style.color = "green";
        status.innerHTML = "<i>Aberto</i>";
        card1.setAttribute("id", id);
        card1.addEventListener("click", editagendamento)
        card.style.cursor = "pointer";
    } else {
        status.style.color = "red";
        status.innerHTML = "<i>Fechado</i>"
        card.style.opacity = 0.6;
        if (foto == "") {
            imagemtabela.className = "fotoag1";
            imagemtabela.src = "sem-foto.jpg";
        } else {
            imagemtabela.className = "fotoag1";
            imagemtabela.src = "agend/" + foto;
            linkimagem.href = "agend/" + foto;
            linkimagem.target = "_blank";
        }
    }

    placa1.appendChild(modelo);
    more.appendChild(oleoando);
    more.appendChild(kmando);
    more.appendChild(filtrooleo);
    more.appendChild(filtrocomb);
    more.appendChild(filtroar);
    more.appendChild(filtroarc);
    more.appendChild(filtroracor);
    more.appendChild(outrofiltro);
    more.appendChild(observando);
    more.appendChild(data);
    more.appendChild(status);
    linkimagem.appendChild(imagemtabela);
    more.appendChild(linkimagem);
    // more.appendChild(tag);


    document.querySelector(".lista").appendChild(card).appendChild(card1).appendChild(card2).appendChild(placa).appendChild(placa1).appendChild(more);
}

function editagendamento() {
    let aux = this.getAttribute("id");
    document.location = "/editagendamento?id=" + aux;
}


async function apagando() {
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




carregarAgendamento();

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


document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
}
document.querySelector("#button-addon2").addEventListener("click", pesquisar)

function pesquisar(event) {
    event.preventDefault();

    form1 = document.querySelector("#pesquisar");
    pesquisa = form1.consultaplaca.value;
    carregarPlaca(pesquisa)

}

function carregarPlaca(pesquisa) {
    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    if (pesquisa == "") {
        carregarAgendamento();
    } else {
        fetch('/agenderesp/' + pesquisa)
            .then((res) => res.json())
            .then((res) => {
                for (veiculo1 of res) {
                    criarLinha(veiculo1.id, veiculo1.fk_placa, veiculo1.obeservacao, veiculo1.km, veiculo1.oleo, veiculo1.filtro_oleo, veiculo1.filtro_ar, veiculo1.filtro_arcondicionado, veiculo1.filtro_gasolina, veiculo1.filtro_hidraulico, veiculo1.filtro_racor, veiculo1.data, veiculo1.realizado, veiculo1.placa, veiculo1.modelo);
                }

            })
    }

}
