import { ICategoryInterface } from "../../interface/ICategoryInterface";
import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class CreateCategoryService {
    async execute({ name, description }: ICategoryInterface) {
        if (!name || !description) {
            throw new Error("Nome e descrição são obrigatórios.");
        }

        const categorysRepository = getCustomRepository(CategorysRepositories);
        const category = categorysRepository.create({
            name,
            description,
        });

        try {
            await categorysRepository.save(category);
        } catch (error) {
            console.error("Erro ao salvar a categoria:", error);
            throw new Error("Ocorreu um erro ao criar a categoria.");
        }

        return category;
    }
}

export { CreateCategoryService };
