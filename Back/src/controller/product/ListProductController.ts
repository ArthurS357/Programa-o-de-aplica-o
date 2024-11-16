import { Request, Response } from "express";
import { ListProductService } from "../../service/product/ListProductService";

class ListProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listProductService = new ListProductService();
        try {
            const products = await listProductService.execute();
            return response.json(products);
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao listar os produtos." });
        }
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;

        // Verificação se o ID é fornecido
        if (!id) {
            return response.status(400).json({ error: "ID é obrigatório." });
        }

        const listProductService = new ListProductService();
        try {
            const product = await listProductService.findById(id);
            if (!product) {
                return response.status(404).json({ error: "Produto não encontrado." });
            }
            return response.json(product);
        } catch (error) {
            console.error("Erro ao encontrar o produto:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao encontrar o produto." });
        }
    }
}

export { ListProductController };
