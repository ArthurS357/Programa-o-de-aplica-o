import { Request, Response } from "express";
import { ListUserService } from "../../service/user/ListUserService";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUserService = new ListUserService();

    try {
      const users = await listUserService.execute();
      return response.status(200).json(users); // Retorna 200 OK
    } catch (error) {
      console.error("Error listing users:", error);
      return response.status(500).json({ error: "Internal Server Error" }); // Retorna 500 em caso de erro inesperado
    }
  }

  async findById(request: Request, response: Response) {
    const id = request.params.id;

    // Validação de entrada
    if (!id) {
      return response.status(400).json({ error: "User ID is required" });
    }

    const listUserService = new ListUserService();

    try {
      const user = await listUserService.findById(id);
      if (!user) {
        return response.status(404).json({ error: "User not found" }); // Retorna 404 se o usuário não for encontrado
      }
      return response.status(200).json(user); // Retorna 200 OK
    } catch (error) {
      console.error("Error finding user:", error);
      return response.status(500).json({ error: "Internal Server Error" }); // Retorna 500 em caso de erro inesperado
    }
  }
}

export { ListUsersController };
