import { Request, Response } from "express";
import { ListSaleService } from "../../service/sale/ListSaleService";

class ListSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSaleService = new ListSaleService();
        try {
            const sales = await listSaleService.execute();
            return response.json(sales);
        } catch (error) {
            console.error("Erro ao listar vendas:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao listar as vendas." });
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params; // Desestruturação para obter o ID
        const listSaleService = new ListSaleService();

        // Verifica se o ID é fornecido e não é uma string vazia
        if (!id || id.trim() === "") {
            return response.status(400).json({ error: "ID da venda é obrigatório." });
        }

        try {
            const sale = await listSaleService.findById(id);
            if (!sale) {
                return response.status(404).json({ error: "Venda não encontrada." });
            }
            return response.json(sale);
        } catch (error) {
            console.error("Erro ao encontrar a venda:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao encontrar a venda." });
        }
    }
}

export { ListSaleController };
