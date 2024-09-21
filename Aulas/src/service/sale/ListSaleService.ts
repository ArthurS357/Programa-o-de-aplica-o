import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";
import { Sale } from "../../entities/sale"; // Importar a entidade Sale, se necessário

class ListSaleService {
    async execute(): Promise<Sale[]> { // Substitua 'Sale' pelo tipo correto, se necessário
        const salesRepository = getCustomRepository(SalesRepositories);

        try {
            const sales = await salesRepository
                .createQueryBuilder("sale")
                .getMany();
            return sales;
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
            throw new Error("Não foi possível recuperar os dados das vendas");
        }
    }
}

export { ListSaleService };
