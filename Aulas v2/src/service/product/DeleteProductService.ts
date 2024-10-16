import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";

class DeleteProductService {
  async execute(id: any) {
    if (!id) {
      throw new Error("Id Incorrect");
    }
    const productsRepository = getCustomRepository(ProductsRepositories)
    const productAlreadyExists = await productsRepository.findOne({
      id,
    });

    if (!productAlreadyExists) {
      throw new Error("Sale not exists");

    }

    const ret = await productsRepository.delete(id);

    var messagmsgDelete = {
      message: "Registro excluido com sucesso"
    }
    return messagmsgDelete;
  }
}
export { DeleteProductService };