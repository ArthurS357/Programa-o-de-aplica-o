import { ISupplyInterface } from "../../interface/ISupplyInterface";
import { SupplysRepositories } from "../../repositories/supplyRepositories";
import { UsersRepositories } from "../../repositories/usersRepositories";
import { Supply } from "../../entities/supply";
import { getCustomRepository } from "typeorm";

class UpdateSupplyService {
    async execute({ id, user, supplierName, contactEmail, deliveryDate, quantity, unitPrice, orderStatus }: ISupplyInterface): Promise<Supply> {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const supplyRepository = getCustomRepository(SupplysRepositories);
        const userRepository = getCustomRepository(UsersRepositories);
        
        const supplyAlreadyExists = await supplyRepository.findOne({ where: { id } });
        if (!supplyAlreadyExists) {
            throw new Error("Fornecedor não encontrado.");
        }

        const foundUser = await userRepository.findOne({ where: { id: user.id } });
        if (!foundUser) {
            throw new Error("Usuário não existe.");
        }
        supplyAlreadyExists.user = foundUser;
        supplyAlreadyExists.supplierName = supplierName; 
        supplyAlreadyExists.contactEmail = contactEmail; 
        supplyAlreadyExists.deliveryDate = deliveryDate; 
        supplyAlreadyExists.quantity = quantity; 
        supplyAlreadyExists.unitPrice = unitPrice; 
        supplyAlreadyExists.orderStatus = orderStatus; 

        await supplyRepository.save(supplyAlreadyExists);
        
        return supplyAlreadyExists;  
    }
}

export { UpdateSupplyService };
