import { IProfileRequest } from "./IProfileRequest";

/**
 * Interface que define a estrutura de um pedido de usuário.
 */
interface IUserRequest {
  id?: string; // ID do usuário (opcional)
  name: string; // Nome do usuário
  email: string; // Email do usuário
  admin?: boolean; // Indica se o usuário é um administrador (opcional)
  password: string; // Senha do usuário
  profile: IProfileRequest; // Perfil associado ao usuário
}

export { IUserRequest };
