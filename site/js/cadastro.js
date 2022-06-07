document.querySelector("#cadastrar").addEventListener("click", cadastrando);

async function cadastrando(event){
    event.preventDefault();

    let form = document.querySelector('#formcadastro');
    placa = form.consultaplaca.value
    if(document.querySelector("#inlineRadio1").checked){
        console.log("sim")
    }else if(document.querySelector("#inlineRadio2").checked){
        console.log("nao")
    }
}