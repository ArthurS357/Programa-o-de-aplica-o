import { Request, Response } from "express";
import { UpdateCategoryService } from "../../service/category/UpdateCategoryService";

class UpdateCategoryController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;
        const id = request.params.id;

        // Validação de entrada
        if (!id) {
            return response.status(400).json({ error: "ID da categoria é obrigatório." });
        }
        if (!name || !description) {
            return response.status(400).json({ error: "Nome e descrição são obrigatórios." });
        }

        const category = {
            id: id,
            name: name,
            description: description,
        };

        const updateCategoryService = new UpdateCategoryService();

        try {
            const ret = await updateCategoryService.execute(category);
            return response.status(200).json(ret); // Retorna 200 OK
        } catch (error) {
            console.error("Erro ao atualizar a categoria:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar a categoria." });
        }
    }
}

export { UpdateCategoryController };
