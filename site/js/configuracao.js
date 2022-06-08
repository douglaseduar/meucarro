function carregarDados(id){
    fetch('/user/'+ id)
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            preencher(veiculo.id, veiculo.nome, veiculo.telefone, veiculo.endereco, veiculo.foto);
        }
      //      preencher(res.id, res.nome, res.email, res.telefone, res.endereco, res.foto);
        
    })
    
}

function preencher(id, nome, email, telefone, endereco, foto){
var form = document.querySelector("#formedit");
form.nome.value = nome;
form.telefone.value = telefone;
form.email.value = email;
form.foto.value = foto;
}



carregarDados(1);

