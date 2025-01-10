import { Request, Response } from "express";
import { ListSupplyService } from "../../service/supply/ListSupplyService";

class ListSupplyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSupplyService = new ListSupplyService();
        try {
            const supplies = await listSupplyService.execute();
            return response.json(supplies);
        } catch (error) {
            console.error("Erro ao listar fornecedores:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao listar os fornecedores." });
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const listSupplyService = new ListSupplyService();
        try {
            const supply = await listSupplyService.findById(id);
            if (!supply) {
                return response.status(404).json({ error: "Fornecedor não encontrado." });
            }
            return response.json(supply);
        } catch (error) {
            console.error("Erro ao encontrar o fornecedor:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao encontrar o fornecedor." });
        }
    }
}

export { ListSupplyController };
