import { ISupplyInterface } from "../../interface/ISupplyInterface";
import { SupplysRepositories } from "../../repositories/supplyRepositories";
import { getCustomRepository } from "typeorm";
import { User } from "../../entities/user";

class CreateSupplyService {
    async execute({ user, supplierName, contactEmail, deliveryDate, quantity, unitPrice, orderStatus }: ISupplyInterface) {
        if (!user) {
            throw new Error("O usuário é obrigatório.");
        }
        if (!supplierName) {
            throw new Error("O nome do fornecedor é obrigatório.");
        }
        if (!quantity) {
            throw new Error("A quantidade é obrigatória.");
        }
        if (unitPrice === undefined) {
            throw new Error("O preço unitário é obrigatório.");
        }

        const supplysRepository = getCustomRepository(SupplysRepositories);
        const userExists = await supplysRepository.manager.findOne(User, { where: { id: user.id } });

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        const supply = supplysRepository.create({
            user: {
                id: user.id
            },
            supplierName,
            contactEmail,
            deliveryDate,
            quantity,
            unitPrice,
            orderStatus
        });

        try {
            await supplysRepository.save(supply);
        } catch (error) {
            console.error("Erro ao salvar o fornecedor:", error);
            throw new Error("Ocorreu um erro ao criar o fornecedor. Tente novamente mais tarde.");
        }

        return supply; 
    }
}

export { CreateSupplyService };
