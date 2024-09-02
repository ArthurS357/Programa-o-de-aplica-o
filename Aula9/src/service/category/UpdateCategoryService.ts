import { ICategoryInterface } from "../../interface/ICategoryInterface";
class UpdateCategoryService{
    async execute ({ id, name, description}: ICategoryInterface) {
        return {message: "Registo Update com Sucesso"}
        
    }
}
export {UpdateCategoryService};