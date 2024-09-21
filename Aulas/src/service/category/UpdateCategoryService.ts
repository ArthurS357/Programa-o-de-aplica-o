import { ICategoryInterface } from "../../interface/ICategoryInterface";
import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class UpdateCategoryService {
    async execute({ id, name, description }: ICategoryInterface) {
        // Validação do ID
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const categoryRepository = getCustomRepository(CategorysRepositories);

        // Verifica se a categoria existe
        const category = await categoryRepository.findOne({ id });
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        // Atualiza os campos da categoria
        category.name = name;
        category.description = description;

        // Salva as alterações
        try {
            await categoryRepository.save(category);
        } catch (error) {
            console.error("Erro ao atualizar a categoria:", error);
            throw new Error("Ocorreu um erro ao atualizar a categoria.");
        }

        return category; // Retorna a categoria atualizada
    }
}

export { UpdateCategoryService };
