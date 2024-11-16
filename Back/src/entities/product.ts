import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./category";

@Entity("product")
class Product {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string; // ID do produto, gerado automaticamente

    @Column()
    name!: string; // Nome do produto, obrigatório

    @Column({ nullable: true }) // Descrição opcional
    description?: string; // Descrição do produto

    @Column("decimal") // Usando decimal para o preço
    price!: number; // Preço do produto, obrigatório

    @CreateDateColumn()
    created_at!: Date; // Data de criação

    @UpdateDateColumn()
    updated_at!: Date; // Data de atualização

    @ManyToOne(() => Category)
    @JoinColumn()
    category!: Category; // Categoria do produto, obrigatória

    constructor() {
        // O ID é gerado automaticamente pelo TypeORM
    }
}

export { Product };
