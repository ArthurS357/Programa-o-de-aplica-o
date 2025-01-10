import { IUserRequest } from "./IUserRequest";

interface ISupplyInterface {
    id?: string;
    user: IUserRequest;
    supplierName: string; // Nome do fornecedor
    contactEmail: string; // Email de contato
    deliveryDate: Date;   // Data de entrega
    quantity: number;     // Quantidade do material
    unitPrice: number;    // Preço unitário do material
    orderStatus: string;  // Status do pedido
}

export { ISupplyInterface };
