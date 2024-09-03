import { IUserRequest } from "../../interface/IUserRequest";

class UpdateUserService{
    async execute ({ id, name, email, admin = false, password}: IUserRequest) {
        if (!email) {
            throw new Error("Email Incorrect");
        }
        if (!password) {
            throw new Error("Password Incorrect");
        }
        var vuser = {
            id: 1, name:name, email:email, admin: admin, password: password
        }
        return {message: "Registo Update com Sucesso"}
        
    }
}
export {UpdateUserService};