import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuthenticateRequest } from "../../interface/IAuthenticateRequest";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";

// Classe de erro personalizada para autenticação
class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    
    // Melhorar a busca do usuário
    const user = await usersRepositories.findOne({ where: { email } });
    
    if (!user) {
      throw new AuthError("Email incorreto");
    }
    
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AuthError("Senha incorreta");
    }
    
    // Gerar token
    const token = sign(
      {
        email: user.email,
        userId: user.id, // Incluindo o ID do usuário no payload
      },
      process.env.JWT_SECRET || "segredo", // Usar variável de ambiente para o segredo
      {
        subject: user.id.toString(), // Usar o ID do usuário como subject
        expiresIn: "1d",
      }
    );
    
    return token;
  }
}

export { AuthenticateUserService };
