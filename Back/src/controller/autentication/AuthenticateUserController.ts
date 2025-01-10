import { Request, Response } from "express";
import { AuthenticateUserService } from "../../service/autentication/AuthenticateUserService";

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;
        console.log("Tentativa de login para o email:", email); // Incluindo o email no log
        const authenticateUserService = new AuthenticateUserService();

        try {
            const token = await authenticateUserService.execute({
                email,
                password,
            });
            return response.json({ token }); // Retorna o token em um objeto
        } catch (error) {
            // Verifica se o erro é uma instância de Error
            const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
            return response.status(401).json({ message: errorMessage }); // Retorna erro 401 para falha de autenticação
        }
    }
}

export { AuthenticateUserController };
