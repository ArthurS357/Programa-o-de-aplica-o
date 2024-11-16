import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/";

$("#btnGravar").click(async function () {
    var id = $("#txtId").val();
    var name = $("#txtName").val();
    var email = $("#txtEmail").val();
    var admin = $("#chkAdmin").prop('checked');
    var password = $("#txtPassword").val();
    var profile = $("#ddlProfile option:selected").val();

    try {
        if (!id) {
            await axios.post(url + 'users', {
                name: name,
                email: email,
                admin: admin,
                password: password,
                profile: { id: profile }
            });
            alert("Usuario gravado com sucesso");
        } else {
            await axios.put(url + 'users/' + id, {
                name: name,
                email: email,
                admin: admin,
                password: password,
                profile: { id: profile }
            });
            alert("Usuário atualizado com sucesso");
        }
        location.reload();
    } catch (error) {
        alert("Erro durante a gravação");
    }
});

$("#btnCancel").click(function () {
    try {
    $("#txtId").val('');
    $("#txtName").val('');
    $("#txtEmail").val('');
    $("#txtPassword").val('');
    $("#chkAdmin").prop('checked', false);
} catch (error) {
    alert("Erro ao limpar os campos: " + error.message);
}
});

$(document).ready(async function () {
    try {
        const response = await axios.get(url + 'profile');
        $.each(response.data, function (key, item) {
            $('#ddlProfile').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.name)
            );
        });
        loadTable();
    } catch (error) {
        alert(error);
    }
});

function loadTable() {
    axios.get(url + 'users').then(function (response) {
        let table = new DataTable('#tbUsers', {
            data: response.data,
            columns: [
                { data: 'id' },
                { data: 'name' },
                { data: 'email' },
                {
                    data: null,
                    defaultContent: '<button id="edit">Editar</button>&nbsp;<button id="excluir">Excluir</button>',
                    targets: -1
                },
            ]
        });

        table.on('click', 'button', function () {
            const data = table.row($(this).parents('tr')).data();
            if (this.id === 'edit') {
                loadUser(data.id);
            } else {
                if (confirm("Você realmente deseja excluir este usuário?")) {
                    Excluir(data.id);
                }
            }
        });
    }).catch(function (error) {
        alert(error);
    });
}

async function loadUser(id) {
    try {
        const response = await axios.get(url + 'users/' + id);
        $("#txtId").val(response.data.id);
        $("#txtName").val(response.data.name);
        $("#txtEmail").val(response.data.email);
        $("#chkAdmin").prop('checked', response.data.admin);
    } catch (error) {
        alert("Erro ao carregar os dados do Usurio: " + error.message);
    }
}

async function Excluir(id) {
    try {
        await axios.delete(url + 'users/' + id);
        alert("Registro excluído com sucesso");
        location.reload();
    } catch (error) {
        console.log(error);
    }
}
