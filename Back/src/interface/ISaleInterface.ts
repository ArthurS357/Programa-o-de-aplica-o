import { IUserRequest } from "./IUserRequest";
import { IProductInterface } from "./IProductInterface";
import { IClientInterface } from "./IClientInterface";

// Interface que representa uma venda
interface ISaleInterface {
    id?: string; // ID da venda (opcional)
    user: IUserRequest; // Informações do usuário que realiza a venda
    product: IProductInterface; // Informações do produto vendido
    client: IClientInterface; // Informações do cliente que está comprando
    quantity: string; // Quantidade do produto vendido
}

export { ISaleInterface };
