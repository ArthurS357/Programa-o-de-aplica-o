import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user";
import { Product } from "./product";
import { Client } from "./client";

// Entidade que representa uma venda
@Entity("sale")
class Sale {
    @PrimaryColumn()
    readonly id!: string; // ID da venda, gerado automaticamente

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User; // Relacionamento com a entidade User

    @ManyToOne(() => Product)
    @JoinColumn()
    product!: Product; // Relacionamento com a entidade Product

    @ManyToOne(() => Client)
    @JoinColumn()
    client!: Client; // Relacionamento com a entidade Client

    @Column()
    quantity!: string; // Quantidade do produto vendido

    @CreateDateColumn()
    created_at!: Date; // Data de criação da venda

    @UpdateDateColumn()
    updated_at!: Date; // Data da última atualização da venda

    constructor() {
        // Gera um UUID se o ID não estiver definido
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Sale };
