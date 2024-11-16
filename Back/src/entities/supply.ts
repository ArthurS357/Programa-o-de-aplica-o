import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user";

@Entity("supply")
class Supply {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    supplierName!: string; // Nome do fornecedor

    @Column()
    contactEmail!: string; // Email de contato

    @Column()
    deliveryDate!: Date; // Data de entrega

    @Column()
    quantity!: number; // Quantidade do material

    @Column({ type: "decimal", precision: 10, scale: 2 })
    unitPrice!: number; // Preço unitário do material

    @Column()
    orderStatus!: string; // Status do pedido

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    constructor() {
        this.id = uuid(); // O ID é gerado automaticamente pelo TypeORM
    }
}

export { Supply };
