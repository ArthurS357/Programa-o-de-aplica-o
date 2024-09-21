import { Request, Response } from "express";
import { CreateProductService } from "../../service/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { id, name, description, price, categoryId } = request.body;

        // Validação de entrada
        if (!name || !description || price === undefined || !categoryId) {
            return response.status(400).json({ error: "Todos os campos, exceto ID, são obrigatórios." });
        }

        const product = {
            id: id, 
            name: name,
            description: description,
            price: price,
            categoryId: categoryId,
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