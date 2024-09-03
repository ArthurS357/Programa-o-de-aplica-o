import {Request, Response} from "express";
import { ListClientService } from "../../service/client/ListClientService";
class ListClientController {
    	async handle(request: Request, response: Response) {    
      		const listclientService= new ListClientService()
    		const ret= await listclientService.execute()
    		return response.json(ret);
    	}
}
export { ListClientController };