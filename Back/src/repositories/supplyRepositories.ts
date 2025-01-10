import { EntityRepository, Repository } from "typeorm";
import { Supply } from "../entities/supply";

@EntityRepository(Supply)
class SupplysRepositories extends Repository<Supply> {
    //Adicionar métodos personalizados, se necessário

    async findBySupplierName(supplierName: string): Promise<Supply[]> {
        return this.createQueryBuilder("supply")
            .where("supply.supplierName = :supplierName", { supplierName })
            .getMany();
    }
}

export { SupplysRepositories };
