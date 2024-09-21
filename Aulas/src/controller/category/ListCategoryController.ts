import {Request, Response} from "express";
import { ListCategoryService } from "../../service/category/ListCategoryService";
class ListCategoryController {
    	async handle(request: Request, response: Response) {    
      		const listcategoryService= new ListCategoryService()
    		const ret= await listcategoryService.execute()
    		return response.json(ret);
    	}
}
export { ListCategoryController };