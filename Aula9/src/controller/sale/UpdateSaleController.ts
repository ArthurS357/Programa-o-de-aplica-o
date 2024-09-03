import {Request, Response} from "express";
import { UpdateSaleService } from "../../service/sale/UpdateSaleService";
class UpdateSaleController {
    async handle(request:Request, response: Response) {
        const {userId, productId, clientID, quantity} = request.body;
        const id = request.params.id;
        const sale=
        {
            userId:userId,
            productId:productId,
            clientID:clientID,
            quantity:quantity,
        };
        const updatesaleService = new UpdateSaleService()
        const ret = await updatesaleService.execute(sale)
        return response.json(ret);
    }
}
export { UpdateSaleController };