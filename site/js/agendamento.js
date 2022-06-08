document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";

function carregarAgendamento(id){
    fetch('/agender/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            criarLinha(veiculo.id, veiculo.fk_placa, veiculo.obeservacao, veiculo.km, veiculo.oleo, veiculo.filtro_oleo, veiculo.filtro_ar, veiculo.filtro_arcondicionado, veiculo.filtro_gasolina, veiculo.filtro_hidraulico, veiculo.filtro_racor, veiculo.data, veiculo.realizado);
        }
    })
    
}

function criarLinha (id, fk_placa, observacao, km, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, data1, realizado){
    var card = document.createElement("div");
    card.className = "col";
    var card1 = document.createElement("div");
    card1.className = "card h-100";
    var card2 = document.createElement("div");
    card2.className = "card-body hyst";
    var placa = document.createElement("div");
    placa.className = "placa";
    var placa1 = document.createElement("h5");
    placa1.innerHTML = "<b>" + fk_placa + "</b>";
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
    var data = document.createElement("div");
    data.className = "data";
    data.textContent = data1;
    var status = document.createElement("div");
    status.className = "status;"
    if(realizado = 0){
        status.style.color = "green";
        status.innerHTML = "<i>Aberto</i>";
    }else {
        status.style.color = "red";
        status.innerHTML = "<i>Fechado</i>"
    }

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

    document.querySelector(".lista").appendChild(card).appendChild(card1).appendChild(card2).appendChild(placa).appendChild(placa1).appendChild(more);
}


async function apagando(){
    let idaux = this.getAttribute("id");
   // console.log("Produto com id  deletado com sucesso!")

    let header = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }
    let resposta = await fetch('/car/' + idaux, header);

   // console.log("Produto com id " + idaux + " deletado com sucesso!")
   document.location.reload(true);
}




carregarAgendamento(1);
function carregarDadosMenu(id){
    fetch('/user/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            preencherMenu( cliente.nome, cliente.foto);
        }

    })
    
}

function preencherMenu(nome, foto){
    document.querySelector("#fotomenu").src = foto
    document.querySelector("#nomemenu").textContent = nome;

}

carregarDadosMenu(1);


