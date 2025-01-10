import { Request, Response } from "express";
import { DeleteUserService } from "../../service/user/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const id = request.params.id;

    // Validação de entrada
    if (!id) {
      return response.status(400).json({ error: "User ID is required" });
    }

    const deleteUserService = new DeleteUserService();

    try {
      const result = await deleteUserService.execute(id);
      return response.status(200).json(result); // Retorna 200 OK
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.message === "User not exists") {
        return response.status(404).json({ error: error.message }); // Retorna 404 Not Found
      }
      return response.status(500).json({ error: "Internal Server Error" }); // Retorna 500 em caso de erro inesperado
    }
  }
}

export { DeleteUserController };
