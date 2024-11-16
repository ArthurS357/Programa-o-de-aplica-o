import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/";

$(document).ready(function () {
    loadTable();

    $("#btnGravar").click(async function () {
        const id = $("#txtId").val(); // Captura o ID
        const name = $("#txtName").val();
        const description = $("#txtDescription").val();

        if (!name || !description) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            if (!id) {
                await axios.post(url + 'category', { name, description });
                alert("Categoria gravada com sucesso");
            } else {
                await axios.put(url + 'category/' + id, { name, description });
                alert("Categoria atualizada com sucesso");
            }
            location.reload();
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro durante a gravação. Tente novamente.";
            alert(errorMessage);
            console.error("Erro ao enviar a requisição:", error);
        }
    });

    $("#btnCancel").click(function () {
        clearFields();
    });
});

function clearFields() {
    $("#txtId").val('');
    $("#txtName").val('');
    $("#txtDescription").val('');
}

async function loadTable() {
    try {
        const response = await axios.get(url + 'category');
        const table = new DataTable('#tbCategory', {
            data: response.data,
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'description' },
                {
                    data: null,
                    defaultContent: '<button class="btnEditar">Editar</button>&nbsp;<button class="btnExcluir">Excluir</button>',
                    targets: -1
                },
            ]
        });

        table.on('click', 'button', function () {
            const data = table.row($(this).parents('tr')).data();
            if ($(this).hasClass('btnEditar')) {
                loadCategory(data.id);
            } else {
                excluir(data.id);
            }
        });
    } catch (error) {
        alert("Erro ao carregar categorias: " + (error.response?.data?.message || error.message));
    }
}

async function loadCategory(id) {
    try {
        const response = await axios.get(url + 'category/' + id);
        $("#txtId").val(response.data.id);
        $("#txtName").val(response.data.name);
        $("#txtDescription").val(response.data.description);
    } catch (error) {
        console.error("Erro ao carregar a categoria:", error);
    }
}

async function excluir(id) {
    if (confirm("Tem certeza que deseja excluir a categoria com id: " + id + "?")) {
        try {
            await axios.delete(url + 'category/' + id);
            alert("Registro excluído com sucesso");
            location.reload();
        } catch (error) {
            console.error("Erro ao excluir a categoria:", error);
            alert("Erro ao excluir a categoria: " + (error.response?.data?.message || error.message));
        }
    }
}
