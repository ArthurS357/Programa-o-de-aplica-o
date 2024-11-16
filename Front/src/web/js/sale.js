import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/";

$("#btnGravar").click(async function () {
    var id = $("#txtId").val();
    var user = $("#ddlUser option:selected").val();
    var product = $("#ddlProduct option:selected").val();
    var client = $("#ddlClient option:selected").val();
    var quantity = $("#txtQuantity").val();

    if (!user || !product || !client || !quantity) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        if (!id) {
            await axios.post(url + 'sale', {
                user: { id: user },
                product: { id: product },
                client: { id: client },
                quantity:quantity,
            });
            alert("Venda Gravada com sucesso");
        } else {
            await axios.put(url + 'sale/' + id, {
                user: { id: user },
                product: { id: product },
                client: { id: client },
                quantity:quantity,
            });
            alert("Venda Atualizada com sucesso");
        }
        location.reload();
    } catch (error) {
        alert("Erro durante a gravação: " + (error.response?.data?.message || error.message));
    }
});

$("#btnCancel").click(function () {
    try {
        $("#txtId").val('');
        $("#ddlUser").val('');
        $("#ddlProduct").val('');
        $("#ddlClient").val('');
        $("#txtQuantity").val('');
    } catch (error) {
        alert("Erro ao limpar os campos: " + error.message);
    }
});

$(document).ready(function () {
    // Carregar usuários
    axios.get(url + 'users') 
        .then(function (response) {
            $.each(response.data, function (key, item) {
                $('#ddlUser').append(
                    $("<option></option>")
                        .attr("value", item.id)
                        .text(item.name) // Exibe o nome do usuário
                );
            });
        })
        .catch(function (error) {
            alert("Erro ao carregar usuários: " + (error.response?.data?.message || error.message));
        });

    // Carregar produtos
    axios.get(url + 'product') 
        .then(function (response) {
            $.each(response.data, function (key, item) {
                $('#ddlProduct').append(
                    $("<option></option>")
                        .attr("value", item.id)
                        .text(item.name) // Exibe o nome do produto
                );
            });
        })
        .catch(function (error) {
            alert("Erro ao carregar produtos: " + (error.response?.data?.message || error.message));
        });

    // Carregar clientes
    axios.get(url + 'client') 
        .then(function (response) {
            $.each(response.data, function (key, item) {
                $('#ddlClient').append(
                    $("<option></option>")
                        .attr("value", item.id)
                        .text(item.name) // Exibe o nome do cliente
                );
            });
        })
        .catch(function (error) {
            alert("Erro ao carregar clientes: " + (error.response?.data?.message || error.message));
        });

    loadTable();
});


function loadTable() {
    axios.get(url + 'sale', {
    }).then(function (response) {
        let table = new DataTable('#tbSale', {
            data: response.data,
            columns: [
                { data: 'id' },
                { data: 'user.name' },
                { data: 'product.name' },
                { data: 'client.name' },
                { data: 'quantity' },
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
                loadSale(data.id);
            } else {
                Excluir(data.id); 
            }
        });
    }).catch(function (error) {
        alert("Erro ao carregar vendas: " + (error.response?.data?.message || error.message));
    });
}

async function loadSale(id) {
    alert("Selecionar id número " + id);
    await axios.get(url + 'sale/' + id, {
    }).then(function (response) {
        $("#txtId").val(response.data.id);
        $("#ddlUser").val(response.data.user.id);
        $("#ddlProduct").val(response.data.product.id);
        $("#ddlClient").val(response.data.client.id);
        $("#txtQuantity").val(response.data.quantity);
    }).catch(function (error) {
        console.log(error);
    });
}

async function Excluir(id) {
    if (confirm("Tem certeza que deseja excluir a venda com id: " + id + "?")) {
        alert("Excluindo id numero" + id)
        await axios.delete(url + 'sale/' + id, {
        }).then(function (response) {
            alert("Registro excluido com sucesso");
            location.reload();
        }).catch(function (error) {
            console.log(error);
        });
    }
}
