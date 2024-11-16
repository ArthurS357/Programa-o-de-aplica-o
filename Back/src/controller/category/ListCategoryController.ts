import { Request, Response } from "express";
import { ListCategoryService } from "../../service/category/ListCategoryService";

class ListCategoryController {
	async handle(request: Request, response: Response) {
		const listCategoryService = new ListCategoryService();
		try {
			const ret = await listCategoryService.execute();
			return response.json(ret);
		} catch (error) {
			return response.status(500).json({ error: 'Internal Server Error' });
		}
	}

	async findById(request: Request, response: Response) {
		const id = request.params.id;
		const listCategoryService = new ListCategoryService();
		try {
			const ret = await listCategoryService.findById(id);
			if (!ret) {
				return response.status(404).json({ error: 'Category not found' });
			}
			return response.json(ret);
		} catch (error) {
			return response.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

export { ListCategoryController };
