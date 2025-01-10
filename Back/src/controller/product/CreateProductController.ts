import { Request, Response } from "express";
import { CreateProductService } from "../../service/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, description, price, category } = request.body;

        // Validação dos campos obrigatórios
        if (!name || !description || price === undefined || !category) {
            return response.status(400).json({ error: "Todos os campos, exceto ID, são obrigatórios." });
        }

        // Validação do preço
        const priceValue = parseFloat(price);
        if (isNaN(priceValue)) {
            return response.status(400).json({ error: "O preço deve ser um número." });
        }

        const product = {
            name,
            description,
            price: priceValue, // Garantindo que o preço seja um número
            category
        };

        const createProductService = new CreateProductService();

        try {
            const ret = await createProductService.execute(product);
            return response.status(201).json(ret); // Retorna 201 Created
        } catch (error) {
            console.error("Erro ao criar o produto:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao criar o produto." });
        }
    }
}

export { CreateProductController };
