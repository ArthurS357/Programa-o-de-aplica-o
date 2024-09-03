import { IProductInterface } from "../../interface/IProductInterface";
class UpdateProductService{
    async execute ({ id, name, description, price, categoryId}: IProductInterface) {
        return {message: "Registo Update com Sucesso"}
        
    }
}
export {UpdateProductService};