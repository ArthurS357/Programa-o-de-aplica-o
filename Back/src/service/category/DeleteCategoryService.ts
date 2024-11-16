import { CategorysRepositories } from "../../repositories/categorysRepositories";
import { getCustomRepository } from "typeorm";

class DeleteCategoryService {
  async execute(id: any) {
    if (!id) {
      throw new Error("Id Incorrect");
    }
    const categorysRepository = getCustomRepository(CategorysRepositories)
    const categoryAlreadyExists = await categorysRepository.findOne({
      id,
    });

    if (!categoryAlreadyExists) {
      throw new Error("Category not exists");

    }

    const ret = await categorysRepository.delete(id);

    var messagmsgDelete = {
      message: "Registro excluido com sucesso"
    }
    return messagmsgDelete;
  }
}
export { DeleteCategoryService };