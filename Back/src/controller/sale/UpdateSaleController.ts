import { Request, Response } from "express";
import { UpdateSaleService } from "../../service/sale/UpdateSaleService";

class UpdateSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user, product, client, quantity } = request.body;
        const { id } = request.params; // Desestruturação para obter o ID

        // Verifica se o ID da venda é fornecido
        if (!id || id.trim() === "") {
            return response.status(400).json({ error: "ID da venda é obrigatório." });
        }

        // Verifica se todos os campos obrigatórios estão presentes
        if (!user || !product || !client || quantity === undefined) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const sale = {
            id,
            user,
            product,
            client,
            quantity,
        };

        const updateSaleService = new UpdateSaleService();
        try {
            const updatedSale = await updateSaleService.execute(sale);
            return response.status(200).json(updatedSale);
        } catch (error) {
            console.error("Erro ao atualizar a venda:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar a venda." });
        }
    }
}

export { UpdateSaleController };
