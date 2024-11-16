import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/";

$("#btnLogin").click(async function () {
    var email = $("#txtEmail").val();
    var password = $("#txtPassword").val();

    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await axios.post(url + 'login', {
            email: email,
            password: password
        });
        alert("Usuário logado com sucesso");
        
        // Redireciona para o diretório "menu"
        window.location.href = "menu.html"; 

    } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao fazer login. Tente novamente.";
        alert(errorMessage);
    }
});

$("#btnCancel").click(function () {
    try {
        $("#txtEmail").val('');
        $("#txtPassword").val('');
    } catch (error) {
        alert("Erro ao limpar os campos: " + error.message);
    }
});
