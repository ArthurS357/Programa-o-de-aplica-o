import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";
import { Category } from "../../entities/category";

class ListCategoryService {
  async execute(): Promise<Category[]> {
    const categoryRepository = getCustomRepository(CategorysRepositories);
    try {
      const categorys = await categoryRepository
        .createQueryBuilder("category")
        .getMany();
      return categorys;
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      throw new Error("Ocorreu um erro ao listar as categorias.");
    }
  }

  async findById(id: string): Promise<Category | undefined> {
    const categorysRepository = getCustomRepository(CategorysRepositories);
    try {
      const categorys = await categorysRepository.findOne({ id });
      return categorys;
    } catch (error) {
      console.error("Erro ao encontrar a categoria:", error);
      throw new Error("Ocorreu um erro ao encontrar a categoria.");
    }
  }
}

export { ListCategoryService };