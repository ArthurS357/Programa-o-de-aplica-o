import {Request, Response} from "express";
import { ListSaleService } from "../../service/sale/ListSaleService";
class ListSaleController {
    	async handle(request: Request, response: Response) {    
      		const listsaleService= new ListSaleService()
    		const ret= await listsaleService.execute()
    		return response.json(ret);
    	}
}
export { ListSaleController };