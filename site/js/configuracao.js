if(!localStorage.getItem("sessionid")){
    location = "/login"
}



document.querySelector("marquee").textContent = "Seja bem vindo ao nosso sistema, quando tivermos algum aviso ele irá passar aqui!";

function carregarDados(id){
    fetch('/user/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(cliente of res){
            preencher(cliente.id, cliente.nome, cliente.telefone, cliente.email, cliente.endereco, cliente.foto);
        }
      //      preencher(res.id, res.nome, res.email, res.telefone, res.endereco, res.foto);
        
    })
    
}

function preencher(id, nome, telefone, email, endereco, foto){
var form = document.querySelector("#formedit");
form.nome.value = nome;
form.nome.id = id;
form.telefone.value = telefone;
form.email.value = email;
form.foto.value = foto;
if(foto == undefined){form.foto.value = "";}
document.querySelector("#endereco").value = endereco
}


carregarDados(localStorage.getItem("id"));

document.querySelector("#logout").addEventListener("click", sair)

function sair(){
    localStorage.removeItem("id");
    localStorage.removeItem("sessionid");
    location = "/login";
}



document.querySelector("#atualizar").addEventListener("click", atualizar)

async function atualizar(event){
    event.preventDefault();
    
    var form = document.querySelector("#formedit");
    let nome = form.nome.value
   let  telefone = form.telefone.value;
    let email = form.email.value;
   let  foto = form.foto.value;
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
    let resposta = await fetch('/user/' + id, header);
    resposta = await resposta.json();

    document.location.reload(true);
}

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
    if(foto != ""){
        document.querySelector("#fotomenu").src = foto
    }
    document.querySelector("#nomemenu").textContent = nome;

}

carregarDadosMenu(localStorage.getItem("id"));
