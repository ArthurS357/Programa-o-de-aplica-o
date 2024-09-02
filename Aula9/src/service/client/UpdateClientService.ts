import { IClientInterface } from "../../interface/IClientInterface";
class UpdateClientService{
    async execute ({ id, name, description, cpf, address, fone}: IClientInterface) {
        return {message: "Registo Update com Sucesso"}
        
    }
}
export {UpdateClientService};