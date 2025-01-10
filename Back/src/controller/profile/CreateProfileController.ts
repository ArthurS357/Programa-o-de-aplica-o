import { Request, Response } from "express";
import { CreateProfileService } from "../../service/profile/CreateProfileService";

class CreateProfileController {
  async handle(request: Request, response: Response) {
   const { name } = request.body;
   const profile = 
   {
      name:name,
    };    
    const createProfile= new CreateProfileService()
    const ret= await createProfile.execute(profile)
    return response.json(ret);
  }
}
export { CreateProfileController };