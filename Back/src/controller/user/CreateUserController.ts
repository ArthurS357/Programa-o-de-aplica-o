import { Request, Response } from "express";
import { CreateUserService } from "../../service/user/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin = false, password, profile } = request.body;

    // Validação de entrada
    if (!name || !email || !password || !profile) {
      return response.status(400).json({ error: "Missing required fields" });
    }

    const user = {
      name,
      email,
      admin,
      password,
      profile,
    };

    const createUserService = new CreateUserService();

    try {
      const createdUser = await createUserService.execute(user);
      return response.status(201).json(createdUser); // Retorna 201 Created
    } catch (error) {
      console.error("Error creating user:", error);
      return response.status(500).json({ error: error.message || "Internal Server Error" });
    }
  }
}
export { CreateUserController };
