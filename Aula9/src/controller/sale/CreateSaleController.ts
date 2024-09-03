import {Request, Response} from "express";
import { CreateSaleService } from "../../service/sale/CreateSaleService";
class CreateSaleController {
    async handle(request:Request, response: Response) {
        const {id, userId, description, productId, clientID, quantity} = request.body;
        console.log(id)
        console.log(userId)
        console.log(description)
        console.log(productId)
        console.log(clientID)
        const sale =
        {
            id:id,
            userId:userId,
            description:description,
            productId:productId,
            clientID:clientID,
            quantity:quantity
        };
        const createsaleService = new CreateSaleService()
        const ret = await createsaleService.execute(sale)
        return response.json(ret);
    }
}
export {CreateSaleController};