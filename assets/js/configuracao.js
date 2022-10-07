function fmarquee(ver){
    if(ver == "verdade"){
        document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";
    }else{
        document.querySelector("marquee").textContent = "Adicione seu número do WhatsApp para receber todos os avisos do sistema!";
        document.querySelector("marquee").style.color = "white";
        document.querySelector("marquee").style.height = "30px";
        document.querySelector("marquee").style.background = "green";
    }
}

function carregarDados(id) {
    fetch('/user/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                preencher(cliente.id, cliente.nome, cliente.telefone, cliente.email, cliente.endereco, cliente.foto);
            }

        })

}

function preencher(id, nome, telefone, email, endereco, foto) {
    var form = document.querySelector("#formedit");
    form.nome.value = nome;
    form.nome.id = id;
    form.telefone.value = telefone;
    form.email.value = email;
    form.foto.value = foto;
    if (foto == undefined) {
        form.foto.value = "";
    }
    document.querySelector("#endereco").value = endereco
    if(telefone == ""){
        fmarquee("1");
    }else{
        fmarquee("verdade")
    }
}


carregarDados();

document.querySelector("#logout").addEventListener("click", sair)

function sair() {
    location = "/logout";
}



document.querySelector("#atualizar").addEventListener("click", atualizar)

async function atualizar(event) {
    event.preventDefault();

    var form = document.querySelector("#formedit");
    let nome = form.nome.value
    let telefone = form.telefone.value;
    let email = form.email.value;
    let foto = form.foto.value;
    let endereco = form.endereco.value;
    let id = form.nome.id;

    let header = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            nome: nome,
            telefone: telefone,
            email: email,
            foto: foto,
            endereco: endereco
        })
    }
    let resposta = await fetch('/user/', header);
    resposta = await resposta.json();

    document.location.reload(true);
}

function carregarDadosMenu(id) {
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

document.querySelector(".menu").addEventListener("click", mn);

function mn(){
    if(document.querySelector(".sidenav").style.display == "block"){
        document.querySelector(".sidenav").style.display = "none";
        document.querySelector(".sidenav").style.maxWidth = "20vw";
        document.querySelector(".content").style.display = "block";   
    }else{
    document.querySelector(".sidenav").style.display = "block";
    document.querySelector(".sidenav").style.maxWidth = "100vw";
    document.querySelector(".content").style.display = "none";
}}