import { Request, Response } from "express";
import { ListClientService } from "../../service/client/ListClientService";
import { IClientInterface } from "../../interface/IClientInterface";

class ListClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listClientService = new ListClientService();
        try {
            const clients: IClientInterface[] = await listClientService.execute();
            return response.json(clients);
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao listar os clientes." });
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;

        // Validação do ID
        if (!id) {
            return response.status(400).json({ error: "ID é obrigatório." });
        }

        const listClientService = new ListClientService();
        try {
            const client: IClientInterface | undefined = await listClientService.findById(id);
            if (!client) {
                return response.status(404).json({ error: "Cliente não encontrado." });
            }
            return response.json(client);
        } catch (error) {
            console.error("Erro ao encontrar o cliente:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao encontrar o cliente." });
        }
    }
}

export { ListClientController };
