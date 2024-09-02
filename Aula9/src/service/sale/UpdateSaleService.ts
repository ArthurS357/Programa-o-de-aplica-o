import { ISaleInterface } from "../../interface/ISaleInterface";
class UpdateSaleService{
    async execute ({ id, userId, productId, clientID, quantity}: ISaleInterface) {
        return {message: "Registo Update com Sucesso"}
        
    }
}
export {UpdateSaleService};