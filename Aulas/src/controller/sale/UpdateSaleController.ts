import { Request, Response } from "express";
import { UpdateSaleService } from "../../service/sale/UpdateSaleService";

class UpdateSaleController {
    async handle(request: Request, response: Response) {
        const { userId, productId, clientID, quantity } = request.body;
        const id = request.params.id;

        // Validação de entrada
        if (!userId || !productId || !clientID || quantity === undefined) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const sale = {
            id: id,
            userId: userId,
            productId: productId,
            clientID: clientID,
            quantity: quantity,
        };

        const updateSaleService = new UpdateSaleService();

        try {
            const ret = await updateSaleService.execute(sale);
            return response.status(200).json(ret);
        } catch (error) {
            console.error("Erro ao atualizar a venda:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar a venda." });
        }
    }
}

export { UpdateSaleController };