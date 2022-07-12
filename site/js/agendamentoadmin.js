function carregarAgendamento(){
    fetch('/agenderadmin/')
    .then((res) => res.json())
    .then((res) => {
        for(veiculo of res){
            criarLinha(veiculo.id, veiculo.fk_placa, veiculo.obeservacao, veiculo.km, veiculo.oleo, veiculo.filtro_oleo, veiculo.filtro_ar, veiculo.filtro_arcondicionado, veiculo.filtro_gasolina, veiculo.filtro_hidraulico, veiculo.filtro_racor, veiculo.data, veiculo.realizado, veiculo.placa, veiculo.nome);
        }
    })
    
}

function criarLinha (id, fk_placa, observacao, km, oleo, filtro_oleo, filtro_ar, filtro_arcondicionado, filtro_gasolina, filtro_hidraulico, filtro_racor, data1, realizado, placao, cliente){
    
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
    placatabela.innerHTML = placao + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    placatabela.style.textTransform = "uppercase";
    servicostabela.innerHTML = oleo + " | " + observacao +  ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    botaotabela.innerHTML = '<i class="bi bi-envelope-plus-fill" style="font-size: 14pt; color: orange;"></i>ﾠ<i class="bi bi-check-circle-fill" style="font-size: 14pt; color: #009045"></i>';

    linha.appendChild(datatabela);
    linha.appendChild(clientetabela);
    linha.appendChild(placatabela);
    linha.appendChild(servicostabela);
    linha.appendChild(botaotabela);

    document.querySelector(".lista1").appendChild(linha);
}

carregarAgendamento();