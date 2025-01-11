import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/";

$("#btnGravar").click(async function () {
    var id = $("#txtId").val(); // Obtenha o ID aqui
    var name = $("#txtName").val();
    var description = $("#txtDescription").val();
    var cpf = $("#txtCpf").val();
    var address = $("#txtAddress").val();
    var fone = $("#txtFone").val();

    if (!name || !description || !cpf || !address || !fone) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        if (!id) {
            await axios.post(url + 'client', {
                name: name,
                description: description,
                cpf: cpf,
                address: address,
                fone: fone
            });
            alert("Cliente gravado com sucesso");
        } else {
            await axios.put(url + 'client/' + id, {
                name: name,
                description: description,
                cpf: cpf,
                address: address,
                fone: fone
            });
            alert("Cliente atualizado com sucesso");
        }
        location.reload();
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro durante a gravação. Tente novamente.";
        alert(errorMessage);
        console.error("Erro ao enviar a requisição:", error); // Log do erro
    }
});

$("#btnCancel").click(function () {
    try {
        $("#txtId").val('');
        $("#txtName").val('');
        $("#txtDescription").val('');
        $("#txtCpf").val('');
        $("#txtAddress").val('');
        $("#txtFone").val('');
    } catch (error) {
        alert("Erro ao limpar os campos: " + error.message);
    }
});

$(document).ready(function () {
    loadTable();
});

function loadTable() {
    axios.get(url + 'client')
        .then(function (response) {
            let table = new DataTable('#tbClient', {
                data: response.data,
                columns: [
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'description' },
                    { data: 'cpf' },
                    { data: 'address' },
                    { data: 'fone' },
                    {
                        data: null,
                        defaultContent: '<button class="btnEditar">Editar</button>&nbsp;<button class="btnExcluir">Excluir</button>',
                        targets: -1
                    },
                ]
            });

            table.on('click', 'button', function () {
                var data = table.row($(this).parents('tr')).data();
                if ($(this).hasClass('btnEditar')) {
                    loadClient(data.id);
                } else {
                    Excluir(data.id); 
                }
            });
        })
        .catch(function (error) {
            alert("Erro ao carregar clientes: " + (error.response?.data?.message || error.message));
        });
}

async function loadClient(id) {
    alert("Selecionar id número " + id);
    await axios.get(url + 'client/' + id)
        .then(function (response) {
            $("#txtId").val(response.data.id);
            $("#txtName").val(response.data.name);
            $("#txtCpf").val(response.data.cpf);
            $("#txtAddress").val(response.data.address);
            $("#txtFone").val(response.data.fone);
        })
        .catch(function (error) {
            console.log("Erro ao carregar cliente:", error);
        });
}

async function Excluir(id) {
    if (confirm("Tem certeza que deseja excluir o cliente com id: " + id + "?")) {
        alert("Excluindo id numero" + id)
        await axios.delete(url + 'client/' + id, {
        }).then(function (response) {
            alert("Registro excluido com sucesso");
            location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }
}
