import { Request, Response } from "express";
import { CreateSaleService } from "../../service/sale/CreateSaleService";
import { ISaleInterface } from "../../interface/ISaleInterface"; 

class CreateSaleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user, product, client, quantity }: ISaleInterface = request.body;
        const createSaleService = new CreateSaleService();

        try {
            // Chama o serviço para criar a venda
            const sale = await createSaleService.execute({ user, product, client, quantity });
            return response.status(201).json(sale); 
        } catch (error) {
            console.error("Erro ao criar a venda:", error);
            // Retorna um erro 400 se a validação falhar ou 500 para outros erros
            if (error instanceof Error && error.message.includes("obrigatórios")) {
                return response.status(400).json({ error: error.message });
            }
            return response.status(500).json({ error: "Ocorreu um erro ao criar a venda." });
        }
    }
}

export { CreateSaleController };
