function carregarVencidos() {
    fetch('/agenderadminvencido/')
        .then((res) => res.json())
        .then((res) => {
            for (vencido of res) {
                criarLinha(vencido.id_agendamento, vencido.data, vencido.nome, vencido.placa, vencido.modelo, vencido.FK_CLIENTE_id_cliente, vencido.lembrete);
            }
        })

}

function criarLinha(id, data, nome, placa, modelo, fkcliente, avisado) {
    let auxdata = data.split("T");
    let auxdata1 = auxdata[0].split("-");


    let linha = document.createElement("tr");
    let datatabela = document.createElement("td");
    let clientetabela = document.createElement("td");
    let placatabela = document.createElement("td");
    let modelotabela = document.createElement("td");
    let botaotabela = document.createElement("td");

    clientetabela.innerHTML = nome + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    clientetabela.style.cursor = "pointer";
    clientetabela.setAttribute("data-bs-toggle", "modal");
    clientetabela.setAttribute("data-bs-target", "#staticBackdrop");
    clientetabela.setAttribute("id", fkcliente);
    clientetabela.addEventListener("click", getcliente);
    datatabela.textContent = auxdata1[2] + "/" + auxdata1[1] + "/" + auxdata1[0];
    placatabela.textContent = placa;
    placatabela.style.textTransform = "uppercase";
    modelotabela.textContent = modelo;
    modelotabela.style.textTransform = "uppercase";
    botaotabela.innerHTML = '<i class="bi bi-envelope-plus-fill" style="font-size: 14pt; color: orange"></i>';
    botaotabela.setAttribute("id", id);
    botaotabela.addEventListener("click", alterar);
    botaotabela.style.cursor = "pointer";

    if (avisado == 1) {
        botaotabela.innerHTML = "";
        linha.style.opacity = 0.5;
    }

    linha.appendChild(datatabela);
    linha.appendChild(clientetabela);
    linha.appendChild(placatabela);
    linha.appendChild(modelotabela);
    if (avisado == 0) {
        linha.appendChild(botaotabela);
    }
    document.querySelector(".lista1").appendChild(linha);
}


carregarVencidos();

function getcliente() {
    let auxcliente = this.getAttribute("id");
    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    fetch('/clientedetalhe/' + auxcliente)
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                modalcliente(cliente.nome, cliente.endereco, cliente.telefone, cliente.email, cliente.foto, cliente.qtd_fidelidade)

            }

        })


}

function modalcliente(nome, endereco, telefone, email, foto, fidelidade) {

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

async function alterar() {
    let auxid = this.getAttribute("id");

    let header = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            idvencido: auxid
        })
    }
    fetch('/vencidos/', header);
    location.reload();
}