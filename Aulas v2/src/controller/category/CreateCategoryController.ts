import { Request, Response } from "express";
import { CreateCategoryService } from "../../service/category/CreateCategoryService";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        // Validação de entrada
        if (!name || !description) {
            return response.status(400).json({ error: "Nome e descrição são obrigatórios." });
        }

        const category = {
            name: name,
            description: description,
        };

        const createCategoryService = new CreateCategoryService();

        try {
            const ret = await createCategoryService.execute(category);
            return response.status(201).json(ret); // Retorna 201 Created
        } catch (error) {
            console.error("Erro ao criar a categoria:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao criar a categoria." });
        }
    }
}

export { CreateCategoryController };
