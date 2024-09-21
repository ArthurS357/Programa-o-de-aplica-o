import { ICategoryInterface } from "../../interface/ICategoryInterface";
import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class CreateCategoryService {
    async execute({ name, description }: ICategoryInterface) {
        // Validação de entrada
        if (!name || !description) {
            throw new Error("Nome e descrição são obrigatórios.");
        }

        const categorysRepository = getCustomRepository(CategorysRepositories);

        // Cria uma nova categoria
        const category = categorysRepository.create({
            name,
            description,
        });

        // Salva a categoria no repositório
        try {
            await categorysRepository.save(category);
        } catch (error) {
            console.error("Erro ao salvar a categoria:", error);
            throw new Error("Ocorreu um erro ao criar a categoria.");
        }

        return category; // Retorna a categoria criada
    }
}

export { CreateCategoryService };
