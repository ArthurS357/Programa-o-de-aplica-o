import 'regenerator-runtime/runtime';
import axios from 'axios';

const url = "http://localhost:3000/";

$("#btnGravar").click(async function () {
    var id = $("#txtId").val(); 
    var user = $("#ddlUser option:selected").val();
    var supplierName = $("#txtSupplierName").val(); 
    var contactEmail = $("#txtContactEmail").val();
    var deliveryDate = $("#txtDeliveryDate").val();
    var quantity = $("#txtQuantity").val(); 
    var unitPrice = $("#txtUnitPrice").val();
    var orderStatus = $("#txtOrderStatus").val(); 

    if (!user || !supplierName || !contactEmail || !deliveryDate || !quantity ||!unitPrice || !orderStatus) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const payload = {
            user: { id: user },
            supplierName: supplierName,
            contactEmail: contactEmail,
            deliveryDate: deliveryDate,
            quantity: quantity,
            unitPrice: unitPrice,
            orderStatus: orderStatus,

        };

        if (!id) {
            await axios.post(url + 'supply', payload);
            alert("Fornecedor gravado com sucesso");
        } else {
            await axios.put(url + 'supply/' + id, payload);
            alert("Fornecedor atualizado com sucesso");
        }
        location.reload();
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro durante a gravação. Tente novamente.";
        alert(errorMessage);
    }
});

$("#btnCancel").click(function () {
    try {
        $("#txtId").val('');
        $("#ddlUser").val('');
        $("#txtSupplierName").val('');
        $("#txtContactEmail").val('');
        $("#txtDeliveryDate").val('');
        $("#txtQuantity").val('');
        $("#txtUnitPrice").val('');
        $("#txtOrderStatus").val('');
    } catch (error) {
        alert("Erro ao limpar os campos: " + error.message);
    }
});

$(document).ready(async function () {
    try {
        const response = await axios.get(url + 'users');
        $.each(response.data, function (key, item) {
            $('#ddlUser').append( 
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
    axios.get(url + 'supply').then(function (response) {
        let table = new DataTable('#tbSupply', {
            data: response.data,
            columns: [
                { data: 'id' },
                { data: 'user.name' },
                { data: 'supplierName' },
                { data: 'contactEmail' },
                { data: 'deliveryDate' },
                { data: 'quantity' },
                { data: 'unitPrice' },
                { data: 'orderStatus' },
                {
                    data: null,
                    defaultContent: '<button class="edit">Editar</button>&nbsp;<button class="delete">Excluir</button>',
                    targets: -1
                },
            ]
        });

        table.on('click', 'button', function () {
            const data = table.row($(this).parents('tr')).data();
            if ($(this).hasClass('edit')) { 
                loadSupply(data.id);
            } else if ($(this).hasClass('delete')) { 
                if (confirm("Você realmente deseja excluir este fornecedor?")) {
                    Excluir(data.id);
                }
            }
        });
    }).catch(function (error) {
        alert(error);
    });
}

async function loadSupply(id) {
    try {
        console.log("ID fornecido para a requisição:", id);
        
        const response = await axios.get(url + 'supply/' + id);
        console.log("Resposta da API:", response);
        if (response.data && response.data.id) {
            $("#txtId").val(response.data.id);
            $("#ddlUser").val(response.data.user?.id || '');  
            $("#txtSupplierName").val(response.data.supplierName || '');
            $("#txtContactEmail").val(response.data.contactEmail || '');
            $("#txtDeliveryDate").val(response.data.deliveryDate || '');
            $("#txtQuantity").val(response.data.quantity || '');
            $("#txtUnitPrice").val(response.data.unitPrice || '');
            $("#txtOrderStatus").val(response.data.orderStatus || '');
        } else {
            alert("Fornecedor não encontrado ou dados incompletos.");
        }

    } catch (error) {
        console.error("Erro ao carregar fornecedor: ", error);
        alert("Erro ao carregar fornecedor: " + (error.response?.data?.message || error.message));
    }
}


async function Excluir(id) {
    try {
        await axios.delete(url + 'supply/' + id);
        alert("Registro excluído com sucesso");
        location.reload();
    } catch (error) {
        console.error("Erro ao excluir fornecedor: ", error);
        alert("Erro ao excluir fornecedor: " + (error.response?.data?.message || error.message));
    }
}
