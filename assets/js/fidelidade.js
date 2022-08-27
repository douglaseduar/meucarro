function carregarFidelidade() {
    fetch('/fidelidades/')
        .then((res) => res.json())
        .then((res) => {
            for (fidelidade of res) {
                criarLinha(fidelidade.nome, fidelidade.cupom, fidelidade.utilizado, fidelidade.FK_CLIENTE_id_cliente, fidelidade.id_fidelidade);
            }
        })

}

function criarLinha(nome, cupom, utilizado, fkcliente, id) {

    let linha = document.createElement("tr");
    let clientetabela = document.createElement("td");
    let cupomtabela = document.createElement("td");
    let botaotabela = document.createElement("td");

    clientetabela.innerHTML = nome + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    clientetabela.style.cursor = "pointer";
    clientetabela.setAttribute("data-bs-toggle", "modal");
    clientetabela.setAttribute("data-bs-target", "#staticBackdrop");
    clientetabela.setAttribute("id", fkcliente);
    clientetabela.addEventListener("click", getcliente);
    cupomtabela.innerHTML = '<b style="color: #009045"> ' + cupom + "</b>";
    botaotabela.innerHTML = '<i class="bi bi-check-circle-fill" style="font-size: 14pt; color: #009045"></i>';
    botaotabela.setAttribute("id", id);
    botaotabela.addEventListener("click", alterar);
    botaotabela.style.cursor = "pointer";

    if (utilizado == 1) {
        botaotabela.innerHTML = "";
        clientetabela.style.textDecoration = "line-through";
        cupomtabela.style.textDecoration = "line-through";
        linha.style.opacity = 0.5;
    }

    linha.appendChild(clientetabela);
    linha.appendChild(cupomtabela);
    linha.appendChild(botaotabela);

    document.querySelector(".lista1").appendChild(linha);
}


carregarFidelidade();

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
            idfidelidade: auxid

        })
    }
    fetch('/fidelidades/', header);
    location.reload();
}