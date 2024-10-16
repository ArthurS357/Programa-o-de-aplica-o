import { Request, Response } from "express";
import { CreateSaleService } from "../../service/sale/CreateSaleService";

class CreateSaleController {
    async handle(request: Request, response: Response) {
        const { userId, description, productId, clientID, quantity } = request.body;

        // Validação de entrada
        if (!userId || !productId || !clientID || quantity === undefined) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const sale = {
            userId: userId,
            productId: productId,
            clientID: clientID,
            quantity: quantity,
        };

        const createSaleService = new CreateSaleService();

        try {
            const ret = await createSaleService.execute(sale);
            return response.status(201).json(ret); // Retorna 201 Created
        } catch (error) {
            console.error("Erro ao criar a venda:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao criar a venda." });
        }
    }
}

export { CreateSaleController };
