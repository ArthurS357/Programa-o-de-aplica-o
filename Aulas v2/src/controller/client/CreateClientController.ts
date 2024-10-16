import { Request, Response } from "express";
import { CreateClientService } from "../../service/client/CreateClientService";
class CreateClientController {
    async handle(request: Request, response: Response) {
        const { name, description, cpf, address, fone } = request.body;

        // Validação de entrada
        if (!name || !description || !cpf || !address || !fone) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const client = {
            name: name,
            description: description,
            cpf: cpf,
            address: address,
            fone: fone,
        };

        const createClientService = new CreateClientService();

        try {
            const ret = await createClientService.execute(client);
            return response.status(201).json(ret); // Retorna 201 Created
        } catch (error) {
            console.error("Erro ao criar o cliente:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao criar o cliente." });
        }
    }
}

export { CreateClientController };