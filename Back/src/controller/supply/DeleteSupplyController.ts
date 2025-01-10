import { Request, Response } from "express";
import { DeleteSupplyService } from "../../service/supply/DeleteSupplyService";

class DeleteSupplyController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;

        // Verificação se o ID foi fornecido
        if (!id) {
            return response.status(400).json({ error: "ID do fornecedor é obrigatório." });
        }

        const deleteSupplyService = new DeleteSupplyService();

        try {
            await deleteSupplyService.execute(id);
            return response.status(200).json({ message: "Fornecedor deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar o fornecedor:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao deletar o fornecedor." });
        }
    }
}

export { DeleteSupplyController };
