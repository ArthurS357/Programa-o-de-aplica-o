import {Request, Response} from "express";
import { ListProductService } from "../../service/product/ListProductService";
class ListProductController {
    	async handle(request: Request, response: Response) {    
      		const listproductService= new ListProductService()
    		const ret= await listproductService.execute()
    		return response.json(ret);
    	}
}
export { ListProductController };