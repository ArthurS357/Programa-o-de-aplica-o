import { IProductInterface } from "../../interface/IProductInterface";
import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";

class UpdateProductService {
  async execute({ id, name, description, price, categoryId }: IProductInterface) {
    // Validação do ID
    if (!id) {
      throw new Error("ID é obrigatório.");
    }

    const productRepository = getCustomRepository(ProductsRepositories);

    // Verifica se o produto existe
    const product = await productRepository.findOne({ id });
    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    // Atualiza os campos do produto
    product.name = name;
    product.description = description;
    product.price = price;
    product.categoryId = categoryId;

    // Salva as alterações
    await productRepository.save(product);

    return product; // Retorna o produto atualizado
  }
}

export { UpdateProductService };