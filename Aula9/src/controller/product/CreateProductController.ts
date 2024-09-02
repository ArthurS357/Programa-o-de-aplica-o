import {Request, Response} from "express";
import { CreateProductService } from "../../service/product/CreateProductService";
class CreateProductController {
    async handle(request:Request, response: Response) {
        const {id, name, description, price, categoryId} = request.body;
        console.log(id)
        console.log(name)
        console.log(description)
        console.log(price)
        console.log(categoryId)
        const product=
        {
            id:id,
            name:name,
            description:description,
            price:price,
            categoryId:categoryId,
        };
        const createproductService = new CreateProductService()
        const ret = await createproductService.execute(product)
        return response.json(ret);
    }
}
export {CreateProductController};