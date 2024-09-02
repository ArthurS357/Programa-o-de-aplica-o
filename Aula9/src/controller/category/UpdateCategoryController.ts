import {Request, Response} from "express";
import { UpdateCategoryService } from "../../service/category/UpdateCategoryService";
class UpdateCategoryController {
    async handle(request:Request, response: Response) {
        const {name, description} = request.body;
        const id = request.params.id;
        const category=
        {
            name:name,
            description:description,
        };
        const updatecategoryService = new UpdateCategoryService()
        const ret = await updatecategoryService.execute(category)
        return response.json(ret);
    }
}
export { UpdateCategoryController };