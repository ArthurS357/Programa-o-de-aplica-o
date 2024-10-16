import {Entity,PrimaryColumn,Column,CreateDateColumn,UpdateDateColumn} from "typeorm";
import {v4 as uuid} from "uuid";

@Entity("sale")
class Sale {
    @PrimaryColumn()
    readonly id!: string;
    @Column()
    userId!: string;
    @Column()
    productId!: string;
    @Column()
    clientID!: string;
    @Column()
    quantity!: string;
    @CreateDateColumn()
    created_at!: Date;
    @UpdateDateColumn()
    updated_at!: Date;

    constructor() {
        if (!this.id) {
            this.id=uuid();
        }
    }
}

export {Sale};