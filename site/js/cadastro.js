document.querySelector("#cadastrar").addEventListener("click", cadastrando);
var aux = 0;
var cliente = 1;

async function cadastrando(event){
    event.preventDefault();

    let form = document.querySelector('#formcadastro');
    placa = form.consultaplaca.value
    if(document.querySelector("#inlineRadio1").checked){
        aux = 1;
    }else if(document.querySelector("#inlineRadio2").checked){
        aux = 2;
    }
    else{aux = 3};
    
    let header = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({           
                    placa: placa,
                    tipo: aux,
                    cliente: cliente,
                    modelo: 'carro'
                })
            }
            let resposta = await fetch('/car', header);
            resposta = await resposta.json();
        
            location = "/veiculos";
            
}