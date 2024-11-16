import { Request, Response } from "express";
import { ListProfileService } from "../../service/profile/ListProfileService";

class ListProfileController {
    async handle(request: Request, response: Response) {    
      const listuserService= new ListProfileService()
    const ret= await listuserService.execute()
    return response.json(ret);
    }
    async findById(request: Request, response: Response) {
      const id= request.params.id;
      const listuserService= new ListProfileService()
      const ret= await listuserService.findById(id)
      return response.json(ret);
  
    }
  } 
  export { ListProfileController };