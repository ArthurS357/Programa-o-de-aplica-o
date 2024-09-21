import { Request, Response } from "express";
import { ListSaleService } from "../../service/sale/ListSaleService";

class ListSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSaleService = new ListSaleService();

        try {
            const salesList = await listSaleService.execute();
            return response.status(200).json(salesList);
        } catch (error) {
            console.error("Erro ao buscar a lista de vendas:", error);
            return response.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}

export { ListSaleController };
