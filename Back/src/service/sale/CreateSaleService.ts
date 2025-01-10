import { ISaleInterface } from "../../interface/ISaleInterface";
import { IUserRequest } from "../../interface/IUserRequest";
import { IProductInterface } from "../../interface/IProductInterface";
import { IClientInterface } from "../../interface/IClientInterface";
import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";

class CreateSaleService {
    async execute({ user, product, client, quantity }: ISaleInterface) {
        // Valida a entrada antes de prosseguir
        this.validateInput(user, product, client, quantity);

        const salesRepository = getCustomRepository(SalesRepositories);

        // Cria a venda
        const sale = salesRepository.create({
            user: { id: user.id },
            product: { id: product.id },
            client: { id: client.id },
            quantity,
        });

        // Salva a venda
        return this.saveSale(salesRepository, sale);
    }

    private validateInput(user: IUserRequest, product: IProductInterface, client: IClientInterface, quantity: string) {
        if (!user || !product || !client || !quantity || quantity.trim() === "") {
            throw new Error("Todos os campos são obrigatórios.");
        }
    }

    private async saveSale(repository: SalesRepositories, sale: any) {
        try {
            return await repository.save(sale);
        } catch (error) {
            console.error("Erro ao salvar a venda:", error);
            throw new Error("Ocorreu um erro ao criar a venda. Tente novamente mais tarde.");
        }
    }
}

export { CreateSaleService };
