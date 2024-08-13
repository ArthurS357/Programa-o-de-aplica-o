const express = require('express');
const app = express();

app.use(express.json());

app.get("/Iniciar", (request, response) => {
    console.log("inicio");
    return response.send("iniciando aplicação");

});

app.post("/produto", (request, response) => { //metodo "POST" para insere uma informação.
    console.log (request.body);
    return response.json(request.body);
});

app.delete("/produto/:id", (request, response) =>{
    console.log(request.body);
    return response.json({
        "id": request.params.id
    });
});

app.put("/produto/:id", (request,response) => { //metodo "PUT" para modificar uma informação especifica.
    console.log(request.params.id);
    console.log(request.body);
    return response.json (request.body);
});

app.get("/produto", (request, response) => {
    console.log(request.query)
    return response.json(
        {
            "id": request.query.id,
            "nome": request.query.nome
        }
    );

});

console.log("Start Server:3000")
app.listen(3000);
