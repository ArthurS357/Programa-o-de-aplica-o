import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/";

$("#btnGravar").click(async function () {
    var id = $("#txtId").val();
    var name = $("#txtName").val();
    var description = $("#txtDescription").val();
    var price = $("#txtPrice").val();
    var category = $("#ddlCategory option:selected").val();
    
    try {
        if (!id) {
            await axios.post(url + 'product', {
                name: name,
                description: description,
                price: price,
                category: { id: category }
            });
            alert("Produto Gravado com sucesso");
        } else {
            await axios.put(url + 'product/' + id, {
                name: name,
                description: description,
                price: price,
                category: { id: category }
            });
            alert("Produto Atualizado com sucesso");
        }
        location.reload();
    } catch (error) {
        alert("Erro durante a gravação: " + (error.response?.data?.message || error.message));
    }
});

$("#btnCancel").click(function () {
    try {
        $("#txtId").val('');
        $("#txtName").val('');
        $("#txtDescription").val('');
        $("#txtPrice").val('');
        $("#ddlCategory").val(''); // Limpa a seleção da categoria
    } catch (error) {
        alert("Erro ao limpar os campos: " + error.message);
    }
});

$(document).ready(function () {
    // Carregar categorias
    axios.get(url + 'category') 
        .then(function (response) {
            $.each(response.data, function (key, item) {
                $('#ddlCategory').append(
                    $("<option></option>")
                        .attr("value", item.id)
                        .text(item.name) // Exibe o nome da categoria
                );
            });
        })
        .catch(function (error) {
            alert("Erro ao carregar categorias: " + (error.response?.data?.message || error.message));
        });
    
    loadTable();
});

function loadTable() {
    axios.get(url + 'product')
        .then(function (response) {
            let table = new DataTable('#tbProduct', {
                data: response.data,
                columns: [
                    { data: 'id' },
                    { data: 'name' },
                    { data: 'description' },
                    { data: 'price' },
                    { data: 'category.name' }, 
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
                    loadProduct(data.id);
                } else {
                    Excluir(data.id); 
                }
            });
        })
        .catch(function (error) {
            alert("Erro ao carregar produtos: " + (error.response?.data?.message || error.message));
        });
}

async function loadProduct(id) {
    alert("Selecionar id número " + id);
    await axios.get(url + 'product/' + id)
        .then(function (response) {
            $("#txtId").val(response.data.id);
            $("#txtName").val(response.data.name);
            $("#txtDescription").val(response.data.description);
            $("#txtPrice").val(response.data.price);
            $("#ddlCategory").val(response.data.category.id); // Seleciona a categoria correta
        }).catch(function (error) {
            console.log(error);
        });
}

async function Excluir(id) {
    if (confirm("Tem certeza que deseja excluir o produto com id: " + id + "?")) {
        alert("Excluindo id numero " + id);
        await axios.delete(url + 'product/' + id)
            .then(function (response) {
                alert("Registro excluído com sucesso");
                location.reload();
            })
            .catch(function (error) {
                alert("Erro ao excluir o produto: " + (error.response?.data?.message || error.message));
            });
    }
}
