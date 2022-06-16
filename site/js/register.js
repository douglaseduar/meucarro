document.querySelector("#cadastrar").addEventListener("click", cadastro);

async function cadastro(event){
    event.preventDefault();

    form = document.querySelector("#formregistro");
    nome = form.nome.value;
    telefone = form.telefone.value;
    email = form.email.value;
    if(form.senha1.value == form.senha2.value){

        let header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({           
                nome: nome,
                telefone: telefone,
                email: email,
                senha: form.senha1.value,
                permicao: 0,
                fidelidade: 0
            })
        }
        let resposta = await fetch('/user', header);
        resposta = await resposta.json();
    
        location = "/login";

    }else{alert("Senhas não são iguais")}
    
}