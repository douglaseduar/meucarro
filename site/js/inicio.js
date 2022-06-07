data();

function data(){
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "agosto", "outubro", "novembro", "dezembro")
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    let dataAtual = dia + " de " + monName [data.getMonth() ]   +  " de "  +     data.getFullYear ()
    document.querySelector(".info").textContent = "Seja bem vindo, " + dataAtual;
}