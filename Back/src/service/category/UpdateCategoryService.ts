import { ICategoryInterface } from "../../interface/ICategoryInterface";
import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class UpdateCategoryService {
    async execute({ id, name, description }: ICategoryInterface) {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const categoryRepository = getCustomRepository(CategorysRepositories);
        const category = await categoryRepository.findOne({ id });
        if (!category) {
            throw new Error("Categoria não encontrada.");
        }

        category.name = name;
        category.description = description;
        try {
            await categoryRepository.save(category);
        } catch (error) {
            console.error("Erro ao atualizar a categoria:", error);
            throw new Error("Ocorreu um erro ao atualizar a categoria.");
        }

        return category; 
    }
}

export { UpdateCategoryService };
