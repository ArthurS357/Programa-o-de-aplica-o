import { Request, Response } from "express";
import { UpdateProductService } from "../../service/product/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description, price, category } = request.body;
        const id = request.params.id;

        // Verificação se o ID é fornecido
        if (!id) {
            return response.status(400).json({ error: "ID do produto é obrigatório." });
        }

        // Verificação dos campos obrigatórios
        if (!name || !description || price === undefined || !category) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        // Validação do preço
        const priceValue = parseFloat(price);
        if (isNaN(priceValue)) {
            return response.status(400).json({ error: "O preço deve ser um número." });
        }

        const product = {
            id,
            name,
            description,
            price: priceValue, // Garantindo que o preço seja um número
            category,
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
