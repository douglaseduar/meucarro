function carregarCliente() {
    fetch('/estatisticac/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#ativo").textContent = cliente.quantidade;
                document.querySelector("#ativo").style.color = "#009045";

            }
        })

}

function carregarCar() {
    fetch('/estatisticacar/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#car").textContent = cliente.quantidade;
                document.querySelector("#car").style.color = "#009045";

            }
        })

}

function carregarFidelidade() {
    fetch('/estatisticafide/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#fide").textContent = cliente.quantidade;
                document.querySelector("#fide").style.color = "#009045";

            }
        })

}

function carregarFidelidades() {
    fetch('/estatisticafides/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#fides").textContent = cliente.quantidade;
                document.querySelector("#fides").style.color = "orange";

            }
        })

}

function carregarAgendamento() {
    fetch('/estatisticaag/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#ag").textContent = cliente.quantidade;
                document.querySelector("#ag").style.color = "#009045";

            }
        })

}

function carregarAgendamentos() {
    fetch('/estatisticaags/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#ags").textContent = cliente.quantidade;
                document.querySelector("#ags").style.color = "orange";

            }
        })

}

function carregarAgendamentosc() {
    fetch('/estatisticaagsc/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                document.querySelector("#agsc").textContent = cliente.quantidade;
                document.querySelector("#agsc").style.color = "red";

            }
        })

}

function carregarClientes() {
    fetch('/estatisticaclientes/')
        .then((res) => res.json())
        .then((res) => {
            for (cliente of res) {
                if (cliente.numero == "") {
                    document.querySelector("#cl").textContent = "--";
                    document.querySelector("#cls").textContent = "--";
                    document.querySelector("#cls").style.color = "cornflowerblue";
                    document.querySelector("#cl").style.color = "cornflowerblue";
                } else {
                    document.querySelector("#cl").textContent = cliente.numero;
                    document.querySelector("#cls").textContent = cliente.nome;
                    document.querySelector("#cls").style.color = "cornflowerblue";
                    document.querySelector("#cl").style.color = "cornflowerblue";

                }
            }
        })

}

function carregarTipos() {
    fetch('/estatisticatipos/')
        .then((res) => res.json())
        .then((res) => {
            for (tipo of res) {
                document.querySelector("#tipos").textContent = tipo.quantidade;
                document.querySelector("#tipos").style.color = "cornflowerblue";

            }
        })

}

function carregarTiposs() {
    fetch('/estatisticatiposs/')
        .then((res) => res.json())
        .then((res) => {
            for (tipo of res) {
                document.querySelector("#tiposs").textContent = tipo.quantidade;
                document.querySelector("#tiposs").style.color = "cornflowerblue";

            }
        })

}

function carregarTiposss() {
    fetch('/estatisticatiposss/')
        .then((res) => res.json())
        .then((res) => {
            for (tipo of res) {
                document.querySelector("#tiposss").textContent = tipo.quantidade;
                document.querySelector("#tiposss").style.color = "cornflowerblue";

            }
        })

}

function carregarTipossss() {
    fetch('/estatisticatipossss/')
        .then((res) => res.json())
        .then((res) => {
            for (tipo of res) {
                document.querySelector("#tipossss").textContent = tipo.quantidade;
                document.querySelector("#tipossss").style.color = "cornflowerblue";

            }
        })

}

document.querySelector("#selecionar").addEventListener("click", periodo0);

function periodo0(event) {
    event.preventDefault();
    let form = document.querySelector("#form");
    let data = form.vdata.value;
    let data1 = form.vdata1.value;
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            vdata: data,
            vdata1: data1
        })
    }
    fetch('/estatisticaagp', header)
        .then((res) => res.json())
        .then((res) => {
            for (periodo of res) {
                document.querySelector("#ag").textContent = periodo.quantidade;
                document.querySelector("#ag").style.color = "#009045";

            }
        })

    periodo1(data, data1);
}

function periodo1(data, data1) {
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            vdata: data,
            vdata1: data1
        })
    }
    fetch('/estatisticaagsp', header)
        .then((res) => res.json())
        .then((res) => {
            for (periodo of res) {
                document.querySelector("#ags").textContent = periodo.quantidade;
                document.querySelector("#ags").style.color = "orange";

            }
        })

    periodo2(data, data1);
}

function periodo2(data, data1) {
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            vdata: data,
            vdata1: data1
        })
    }
    fetch('/estatisticaagscp', header)
        .then((res) => res.json())
        .then((res) => {
            for (periodo of res) {
                document.querySelector("#agsc").textContent = periodo.quantidade;
                document.querySelector("#agsc").style.color = "red";

            }
        })

    periodo3(data, data1);
}

function periodo3(data, data1) {
    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            vdata: data,
            vdata1: data1
        })
    }
    fetch('/estatisticaclientesp', header)
        .then((res) => res.json())
        .then((res) => {
            for (periodo of res) {
                document.querySelector("#cl").textContent = periodo.numero;
                document.querySelector("#cls").textContent = periodo.nome;
                document.querySelector("#cls").style.color = "cornflowerblue";
                document.querySelector("#cl").style.color = "cornflowerblue";
            }
        })
}

carregarCliente();
carregarCar();
carregarFidelidade();
carregarFidelidades();
carregarAgendamento();
carregarAgendamentos();
carregarAgendamentosc();
carregarClientes();
carregarTipos();
carregarTiposs();
carregarTiposss();
carregarTipossss();