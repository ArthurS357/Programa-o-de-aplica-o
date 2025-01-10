import { Request, Response } from "express";
import { UpdateClientService } from "../../service/client/UpdateClientService";
import { IClientInterface } from "../../interface/IClientInterface";

class UpdateClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, cpf, address, fone }: IClientInterface = request.body;
        const id = request.params.id;

        // Validação do ID
        if (!id) {
            return response.status(400).json({ error: "ID do cliente é obrigatório." });
        }

        // Validação dos campos obrigatórios
        if (!name || !cpf || !address || !fone) {
            return response.status(400).json({ error: "Os campos 'name', 'cpf', 'address' e 'fone' são obrigatórios." });
        }

        const updateClientService = new UpdateClientService();

        try {
            const updatedClient = await updateClientService.execute({ id, name, description, cpf, address, fone });
            return response.status(200).json(updatedClient); // Retorna 200 OK
        } catch (error) {
            console.error("Erro ao atualizar o cliente:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar o cliente." });
        }
    }
}

export { UpdateClientController };
