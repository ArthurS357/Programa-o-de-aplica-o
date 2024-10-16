import { Request, Response } from "express";
import { UpdateProductService } from "../../service/product/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response) {
        const { name, description, price, categoryId } = request.body;
        const id = request.params.id;

        // Validação de entrada
        if (!id) {
            return response.status(400).json({ error: "ID do produto é obrigatório." });
        }
        if (!name || !description || price === undefined || !categoryId) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const product = {
            id: id,
            name: name,
            description: description,
            price: price,
            categoryId: categoryId,
        };

        const updateProductService = new UpdateProductService();

        try {
            const ret = await updateProductService.execute(product);
            return response.status(200).json(ret);
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar o produto." });
        }
    }
}

export { UpdateProductController };