import { Request, Response } from "express";
import { CreateClientService } from "../../service/client/CreateClientService";
import { IClientInterface } from "../../interface/IClientInterface";

class CreateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, cpf, address, fone }: IClientInterface = request.body;

        // Validação simples (pode ser substituída por uma biblioteca de validação)
        if (!name || !cpf || !address || !fone) {
            return response.status(400).json({ error: "Os campos 'name', 'cpf', 'address' e 'fone' são obrigatórios." });
        }

        const createClientService = new CreateClientService();
        try {
            const client = await createClientService.execute({ name, description, cpf, address, fone });
            return response.status(201).json(client); 
        } catch (error) {
            console.error("Erro ao criar o cliente:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao criar o cliente." });
        }
    }
}

export { CreateClientController };
