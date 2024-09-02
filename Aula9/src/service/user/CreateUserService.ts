import { IUserRequest } from "../../interface/IUserRequest";
import { hash } from "bcryptjs";
	class CreateUserService {
  		async execute({ name, email, admin = false, password }: IUserRequest) {
    	if (!email) {
      		throw new Error("Email incorrect");
    	}
    	if (!password) {
      		throw new Error("Password incorrect");
    	}
    	const passwordHash = await hash(password, 8);
    	console.log(passwordHash)
    	var vuser = {
      		id: 1, name: name, email: email, admin: admin, password: password
    	}
    	return { message: "Registro incluido com Sucesso" }
  }
}
export { CreateUserService };
