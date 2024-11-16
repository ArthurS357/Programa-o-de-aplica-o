import { SalesRepositories } from "../../repositories/salesRepositories";
import { getCustomRepository } from "typeorm";
import { Sale } from "../../entities/sale"; 

class ListSaleService {
    // Método para listar todas as vendas
    async execute(): Promise<Sale[]> {
        const salesRepository = getCustomRepository(SalesRepositories);
        try {
            const sales = await salesRepository
                .createQueryBuilder("sale")
                .leftJoinAndSelect("sale.user", "user") // Junção com User
                .leftJoinAndSelect("sale.client", "client") // Junção com Client
                .leftJoinAndSelect("sale.product", "product") // Junção com Product
                .getMany();
            return sales;
        } catch (error) {
            console.error("Erro ao listar vendas:", error);
            throw new Error("Ocorreu um erro ao listar as vendas.");
        }
    }

    // Método para encontrar uma venda pelo ID
    async findById(id: string): Promise<Sale | undefined> {
        // Verifica se o ID é fornecido e não é uma string vazia
        if (!id || id.trim() === "") {
            throw new Error("ID é obrigatório.");
        }

        const salesRepository = getCustomRepository(SalesRepositories);
        try {
            const sale = await salesRepository.findOne(id); // Busca a venda pelo ID
            return sale;
        } catch (error) {
            console.error("Erro ao encontrar a venda:", error);
            throw new Error("Ocorreu um erro ao encontrar a venda.");
        }
    }
}

export { ListSaleService };
