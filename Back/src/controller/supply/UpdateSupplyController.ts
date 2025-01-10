import { Request, Response } from "express";
import { UpdateSupplyService } from "../../service/supply/UpdateSupplyService";

class UpdateSupplyController {
    async handle(request: Request, response: Response) {
        const { user, supplierName, contactEmail, deliveryDate, quantity, unitPrice, orderStatus } = request.body;
        const id = request.params.id;

        // Verificação de ID obrigatório
        if (!id) {
            return response.status(400).json({ error: "ID de fornecedor é obrigatório." });
        }

        // Verificação de campos obrigatórios
        if (!user || !supplierName || !contactEmail || !deliveryDate || quantity === undefined || unitPrice === undefined || !orderStatus) {
            return response.status(400).json({ error: "Todos os campos são obrigatórios." });
        }

        const supply = {
            id: id,
            user: user,
            supplierName: supplierName,
            contactEmail: contactEmail,
            deliveryDate: deliveryDate,
            quantity: quantity,
            unitPrice: unitPrice,
            orderStatus: orderStatus,
        };

        const updateSupplyService = new UpdateSupplyService();
        try {
            const updatedSupply = await updateSupplyService.execute(supply);
            return response.status(200).json(updatedSupply);
        } catch (error) {
            console.error("Erro ao atualizar o fornecedor:", error);
            return response.status(500).json({ error: "Ocorreu um erro ao atualizar o fornecedor." });
        }
    }
}

export { UpdateSupplyController };
