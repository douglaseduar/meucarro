function criarLinha (id, observacao, oleo, data1, realizado, placao, cliente, fkcliente, aviso){
    
        let gdata = data1.split("T");
        let hora = gdata[1];
        let auxdata = gdata[0].split("-");
        let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0] + " | " + hora;

    let linha = document.createElement("tr");
    let datatabela = document.createElement("td");
    let clientetabela = document.createElement("td");
    let placatabela = document.createElement("td");
    let servicostabela = document.createElement("td");
    let botaotabela = document.createElement("td");
    datatabela.textContent = datamesmo;
    clientetabela.innerHTML = cliente + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    clientetabela.style.cursor = "pointer";
    clientetabela.setAttribute("data-bs-toggle", "modal");
    clientetabela.setAttribute("data-bs-target", "#staticBackdrop");
    clientetabela.setAttribute("id", fkcliente);
    clientetabela.addEventListener("click", getcliente);
    placatabela.innerHTML = placao + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    placatabela.style.textTransform = "uppercase";
    placatabela.setAttribute("data-bs-toggle", "modal");
    placatabela.setAttribute("data-bs-target", "#staticBackdrop");
    placatabela.style.cursor = "pointer";
    placatabela.setAttribute("id", placao);
    placatabela.addEventListener("click", getacarrodetalhe);
    servicostabela.innerHTML = oleo + " | " + observacao +  ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    servicostabela.style.cursor = "pointer";
    servicostabela.setAttribute("id", id);
    servicostabela.addEventListener("click", getagendamentodetalhe);
    servicostabela.setAttribute("data-bs-toggle", "modal");
    servicostabela.setAttribute("data-bs-target", "#staticBackdrop");
    var msg = document.createElement("i");
    if(aviso == 0){
    msg.className = "bi bi-envelope-plus-fill";
    msg.style.color = "orange";
    msg.style.fontSize = "14pt";
    msg.style.cursor = "pointer";
    msg.setAttribute("id", id);
    msg.addEventListener("click", mandarmsg);
}
    var conf = document.createElement("i");
    conf.className = "bi bi-check-circle-fill";
    conf.style.color = "#009045";
    conf.style.fontSize = "14pt";
    conf.style.cursor = "pointer";
    conf.style.marginLeft = "10px";
    conf.setAttribute("id", id);
    conf.addEventListener("click", editagendamento);
    if(realizado == 1){
        datatabela.style.color = "red";
        clientetabela.style.color = "red";
        placatabela.style.color = "red";
        servicostabela.style.color = "red";
        linha.style.opacity = 0.5;
        msg.className = "";
        conf.className = "";
    }
    linha.appendChild(datatabela);
    linha.appendChild(clientetabela);
    linha.appendChild(placatabela);
    linha.appendChild(servicostabela);
    linha.appendChild(botaotabela);
    botaotabela.appendChild(msg);
    botaotabela.appendChild(conf);

    document.querySelector(".lista1").appendChild(linha).appendChild(botaotabela);
}

async function mandarmsg(){
    let auxcliente = this.getAttribute("id");
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({           
            idag: auxcliente
        })
    }
    let resposta = await fetch('/aviso/', header);
    location.reload();
}


function editagendamento(){
    auxida = this.getAttribute("id");
    document.location = "/editagendamentoadmin?id=" + auxida;
}

function getcliente(){
    let auxcliente = this.getAttribute("id");
    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
  elemento.removeChild(elemento.firstChild);}
  fetch('/clientedetalhe/'+ auxcliente)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            modalcliente(cliente.nome, cliente.endereco, cliente.telefone, cliente.email, cliente.foto, cliente.fidelidade)
      
        }

    })


}

function modalcliente(nome, endereco, telefone, email, foto, fidelidade){
    
    var detalhe = document.createElement("div");
    detalhe.innerHTML = "<b> NOME:</b> " + nome + 
    "<br><b>ENDERECO:</b> " + endereco +
    "<br><b>TELEFONE:</b> " + telefone +
    "<br><b>EMAIL:</b> " + email +
    "<br><b>FIDELIDADE:</b> " + fidelidade;

    var imagem = document.createElement("img");
    imagem.src = foto;
    imagem.className = "fotoperfil";

    document.querySelector("#lista").appendChild(detalhe).appendChild(imagem);
}

function getacarrodetalhe(){
    let auxplacao = this.getAttribute("id");
    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
  elemento.removeChild(elemento.firstChild);}
  fetch('/cardetalhe/'+ auxplacao)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo2 of res){
            modalcarro(veiculo2.placa, veiculo2.marca, veiculo2.modelo, veiculo2.AnoModelo, veiculo2.Combustivel, veiculo2.cilindradas, veiculo2.potencia, veiculo2.cor, veiculo2.fipe, veiculo2.ipva, veiculo2.valor)
      
        }

    })
}
function modalcarro(placa, marca, modelo, ano, comb, cc, potencia, cor, fipe, ipva, valor){

    var detalhe = document.createElement("div");
    detalhe.innerHTML = "<b> PLACA:</b> " + placa + 
    "<br><b>MODELO:</b> " + marca + " - " + modelo +
    "<br><b>ANO:</b> " + ano +
    "<br><b>COMBUSTÍVEL:</b> " + comb +
    "<br><b>CILINDRADAS:</b> " + cc + " cc" +
    "<br><b>POTÊNCIA:</b> " + potencia + " cv" +
    "<br><b>COR:</b> " + cor +
    "<br><b>FIPE:</b> " + fipe +
    "<br><b>IPVA:</b> " + ipva +
    "<br><b>VALOR:</b> " + valor;
    var creditos = document.createElement("div");
    creditos.innerHTML = "<br><br><i>Valores fornecidos por https://www.fipeplaca.com.br/</i>";
    creditos.style.textTransform = "none";
    detalhe.style.textTransform = "uppercase";

    document.querySelector("#lista").appendChild(detalhe).appendChild(creditos);
}

function getagendamentodetalhe(){
    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
  elemento.removeChild(elemento.firstChild);}
    let auxid = this.getAttribute("id");
    fetch('/agendamentodetalhe/' + auxid)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo1 of res){
            modalagendamento(veiculo1.id, veiculo1.fk_placa, veiculo1.obeservacao, veiculo1.km, veiculo1.oleo, veiculo1.filtro_oleo, veiculo1.filtro_ar, veiculo1.filtro_arcondicionado, veiculo1.filtro_gasolina, veiculo1.filtro_hidraulico, veiculo1.filtro_racor, veiculo1.data, veiculo1.realizado, veiculo1.placa, veiculo1.modelo);
        }
    })
}

function modalagendamento(id, fk_placa, observacao, km, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, data1, realizado, vplaca, vmodelo){


    var placa = document.createElement("div");
    placa.className = "placa";
    var placa1 = document.createElement("h5");
    placa1.innerHTML = "<b>" + vplaca + "</b>";
    placa.style.textTransform = "uppercase"
    placa.style.textAlign = "center";
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


    document.querySelector("#lista").appendChild(placa).appendChild(placa1).appendChild(more);
}


function carregarAgendamentoTodos(){
    fetch('/agenderadmin/')
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            criarLinha(veiculo.id, veiculo.obeservacao, veiculo.oleo, veiculo.data, veiculo.realizado, veiculo.placa, veiculo.nome, veiculo.fk_cliente, veiculo.aviso);
        }
    })
    
}



function carregarAgendamentoHoje(){
    let now = new Date;
    let auxnow = now.getFullYear + "-" + now.getMonth + "-" + now.getDate + "T";
    fetch('/agenderadminhoje/')
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            criarLinha(veiculo.id, veiculo.obeservacao, veiculo.data, veiculo.realizado, veiculo.placa, veiculo.nome);
        }
    })
    
}


carregarAgendamentoTodos();


document.querySelector("#pesquisa").addEventListener("click", pesquisarag);

function pesquisarag(event){
    event.preventDefault();

    var elemento = document.querySelector(".lista1");
    while (elemento.firstChild) {
  elemento.removeChild(elemento.firstChild);
    }
    var form = document.querySelector("#pesq");
    let auxpesquisa = form.placa.value;
    if(auxpesquisa == ""){
        carregarAgendamentoTodos();
    }else{
    fetch('/agenderespadmin/' + auxpesquisa)
    .then((res) => res.json())
    .then((res) => {
        for(agender of res){
            criarLinha(agender.id, agender.obeservacao, agender.oleo, agender.data, agender.realizado, agender.placa, agender.nome, agender.fk_cliente);
        }

    })}
}