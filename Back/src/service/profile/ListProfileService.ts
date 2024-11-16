
import { getCustomRepository } from "typeorm";
import { ProfileRepositories } from "../../repositories/profileRepositories";

class ListProfileService {
    async execute() {
      const profileRepositories = getCustomRepository(ProfileRepositories);
      const users = await profileRepositories
      .createQueryBuilder("profile").getMany();
      return  users;
    }
  
    async findById(id) {
      const profileRepositories = getCustomRepository(ProfileRepositories);
      const users = await profileRepositories.findOne({id:id});
      return  users;
  
    }
  }
  export { ListProfileService };
  