import {Request, Response} from "express";
import { DeleteSaleService } from "../../service/sale/DeleteSaleService";
class DeleteSaleController {
  async handle(request: Request, response: Response) {

    const id= request.params.id;
    const createsaleService= new DeleteSaleService()
    const ret= await createsaleService.execute(id)
    return response.json(ret);
  }
}
export { DeleteSaleController };