import { Request, Response } from "express";
import { DeleteClientService } from "../../service/client/DeleteClientService";

class DeleteClientController {
    async handle(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;

        // Validação do ID
        if (!id) {
            return response.status(400).json({ error: "ID é obrigatório." });
        }

        const deleteClientService = new DeleteClientService();
        try {
            await deleteClientService.execute(id);
            return response.status(204).send(); // Retorna 204 No Content após a exclusão
        } catch (error) {
            console.error("Erro ao excluir o cliente:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao excluir o cliente." });
        }
    }
}

export { DeleteClientController };
