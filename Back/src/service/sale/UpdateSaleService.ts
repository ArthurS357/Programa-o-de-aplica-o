import { ISaleInterface } from "../../interface/ISaleInterface";
import { SalesRepositories } from "../../repositories/salesRepositories";
import { UsersRepositories } from "../../repositories/usersRepositories";
import { ProductsRepositories } from "../../repositories/productsRepositories";
import { ClientsRepositories } from "../../repositories/clientsRepositories";
import { getCustomRepository } from "typeorm"; 

class UpdateSaleService {
    async execute({ id, user, product, client, quantity }: ISaleInterface) {
        // Verifica se o ID da venda é fornecido
        if (!id || id.trim() === "") {
            throw new Error("ID da venda é obrigatório.");
        }

        const saleRepository = getCustomRepository(SalesRepositories);
        const userRepository = getCustomRepository(UsersRepositories);
        const productRepository = getCustomRepository(ProductsRepositories);
        const clientRepository = getCustomRepository(ClientsRepositories);

        // Verifica se a venda existe
        const saleAlreadyExists = await saleRepository.findOne(id);
        if (!saleAlreadyExists) {
            throw new Error("Venda não encontrada.");
        }

        // Busca usuário, produto e cliente em paralelo
        const [use, prod, clie] = await Promise.all([
            userRepository.findOne(user.id),
            productRepository.findOne(product.id),
            clientRepository.findOne(client.id)
        ]);

        // Verifica se o usuário, produto e cliente existem
        if (!use) {
            throw new Error("Usuário não encontrado.");
        }
        if (!prod) {
            throw new Error("Produto não encontrado.");
        }
        if (!clie) {
            throw new Error("Cliente não encontrado.");
        }

        // Atualiza as propriedades da venda
        saleAlreadyExists.user = use;
        saleAlreadyExists.product = prod;
        saleAlreadyExists.client = clie;
        saleAlreadyExists.quantity = quantity;

        // Salva a venda atualizada
        const updatedSale = await saleRepository.save(saleAlreadyExists);
        return updatedSale; 
    }
}

export { UpdateSaleService };
