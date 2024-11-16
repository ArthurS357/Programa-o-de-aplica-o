import { Request, Response } from "express";
import { CreateSupplyService } from "../../service/supply/CreateSupplyService";
import { ISupplyInterface } from "../../interface/ISupplyInterface";

class CreateSupplyController {
    async handle(request: Request, response: Response) {
        const { user, supplierName, contactEmail, deliveryDate, quantity, unitPrice, orderStatus }: ISupplyInterface = request.body;

        // Verificação de campos obrigatórios
        if (!user || !supplierName || !contactEmail || !deliveryDate || quantity === undefined || unitPrice === undefined || !orderStatus) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const supply = {
            user, 
            supplierName, 
            contactEmail, 
            deliveryDate, 
            quantity, 
            unitPrice, 
            orderStatus,
        };

        const createSupplyService = new CreateSupplyService();

        try {
            const ret = await createSupplyService.execute(supply);
            return response.status(201).json(ret); 
        } catch (error) {
            console.error("Erro ao criar o fornecedor:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao criar o fornecedor." });
        }
    }
}

export { CreateSupplyController };
