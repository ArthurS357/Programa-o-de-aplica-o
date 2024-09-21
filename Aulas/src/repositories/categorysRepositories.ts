import { EntityRepository, Repository } from "typeorm";
import { Category } from "../entities/category";

@EntityRepository(Category)
class CategorysRepositories extends Repository<Category> {
  static createQueryBuilder(arg0: string) {
    throw new Error("Method not implemented.");
  }
}

export { CategorysRepositories };
