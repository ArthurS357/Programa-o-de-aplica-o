import { compare } from "bcryptjs";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IAuthenticateRequest } from "../../interface/IAuthenticateRequest";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/usersRepositories";

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({
      email,
    });
    if (!user){
      throw new Error("Email Incorreto")
    }
    
    const passwordMatch = await compare(password, user?.password);
    if (!passwordMatch) {
      throw new Error("Password incorrect");
    }
    // Gerar token
    const token = sign(
      {
        email: email,
      },
      "UMC-EngSoftware-2024",
      {
        subject: ("others"),
        expiresIn: "1d",
      }
    );
    return token;
  }
}
export { AuthenticateUserService };