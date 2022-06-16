document.querySelector("#login").addEventListener("click", verificar);

async function verificar(event){
    event.preventDefault();

    form = document.querySelector("#logar");
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({           
            email: form.email.value,
            senha: form.senha.value
        })
    }
    await fetch('/login', header)
    .then((res) => res.json())
    .then((res) => {
        for(id of res){
            localStorage.setItem("id", id.id);
            localStorage.setItem("sessionid", id.sessionid)
}
    location = "/inicio";
})
   
}