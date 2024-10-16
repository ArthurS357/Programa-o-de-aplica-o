import { Request, Response } from "express";
import { DeleteSaleService } from "../../service/sale/DeleteSaleService";

class DeleteSaleController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;

        // Validação de entrada
        if (!id) {
            return response.status(400).json({ error: "ID da venda é obrigatório." });
        }

        const deleteSaleService = new DeleteSaleService();

        try {
            const ret = await deleteSaleService.execute(id);
            return response.status(200).json({ message: "Ola", data: ret });
        } catch (error) {
            console.error("Erro ao deletar a venda:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao deletar a venda." });
        }
    }
}

export { DeleteSaleController };
