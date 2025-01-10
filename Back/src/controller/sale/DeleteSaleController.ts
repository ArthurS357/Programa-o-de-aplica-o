import { Request, Response } from "express";
import { DeleteSaleService } from "../../service/sale/DeleteSaleService";

class DeleteSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        // Verifica se o ID é fornecido e não é uma string vazia
        if (!id || id.trim() === "") {
            return response.status(400).json({ error: "ID da venda é obrigatório." });
        }

        const deleteSaleService = new DeleteSaleService();

        try {
            await deleteSaleService.execute(id);
            return response.status(200).json({ message: "Venda deletada com sucesso." });
        } catch (error) {
            if (error.message === "Venda não encontrada.") {
                return response.status(404).json({ error: "Venda não encontrada." });
            }
            console.error("Erro ao deletar a venda:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao deletar a venda." });
        }
    }
}

export { DeleteSaleController };
