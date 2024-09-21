import { Request, Response } from "express";
import { UpdateClientService } from "../../service/client/UpdateClientService";

class UpdateClientController {
    async handle(request: Request, response: Response) {
        const { name, description, cpf, address, fone } = request.body;
        const id = request.params.id;

        // Validação de entrada
        if (!id) {
            return response.status(400).json({ error: "ID do cliente é obrigatório." });
        }
        if (!name || !description || !cpf || !address || !fone) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const client = {
            id: id,
            name: name,
            description: description,
            cpf: cpf,
            address: address,
            fone: fone,
        };

        const updateClientService = new UpdateClientService();

        try {
            const ret = await updateClientService.execute(client);
            return response.status(200).json(ret); // Retorna 200 OK
        } catch (error) {
            console.error("Erro ao atualizar o cliente:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar o cliente." });
        }
    }
}

export { UpdateClientController };
