import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class ListCategoryService {
  async execute() {
    const categorysRepositories = getCustomRepository(CategorysRepositories);
    const categorys = await categorysRepositories
      .createQueryBuilder("category")
      .getMany();
    return categorys;
  }
}
export { ListCategoryService };
