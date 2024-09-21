import { IProductInterface } from "../../interface/IProductInterface";
import { ProductsRepositories } from "../../repositories/productsRepositories";
import { getCustomRepository } from "typeorm";

class CreateProductService {
    async execute({ name, description, price, categoryId }: IProductInterface) {
        // Validação de entrada
        if (!name || !description || price === undefined || !categoryId) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        const productsRepository = getCustomRepository(ProductsRepositories);

        // Cria um novo produto
        const product = productsRepository.create({
            name,
            description,
            price,
            categoryId,
        });

        // Salva o produto no repositório
        try {
            await productsRepository.save(product);
        } catch (error) {
            console.error("Erro ao salvar o produto:", error);
            throw new Error("Ocorreu um erro ao criar o produto.");
        }

        return product; // Retorna o produto criado
    }
}

export { CreateProductService };