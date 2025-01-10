import { Request, Response } from "express";
import { UpdateUserService } from "../../service/user/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password, profile } = request.body;
    const id = request.params.id;

    // Validação de entrada
    if (!id) {
      return response.status(400).json({ error: "User ID is required" });
    }
    if (!name || !email || !password || !profile) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    const user = {
      id,
      name,
      email,
      admin,
      password,
      profile,
    };

    const updateUserService = new UpdateUserService();

    try {
      const updatedUser = await updateUserService.execute(user);
      return response.status(200).json(updatedUser); // Retorna 200 OK
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.message === "User not exists") {
        return response.status(404).json({ error: error.message }); // Retorna 404 se o usuário não for encontrado
      }
      return response.status(500).json({ error: "Internal Server Error" }); // Retorna 500 em caso de erro inesperado
    }
  }
}

export { UpdateUserController };
