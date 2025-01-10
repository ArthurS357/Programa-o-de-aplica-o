import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("client")
class Client {
    @PrimaryGeneratedColumn("uuid")
    readonly id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true }) // Torna a descrição opcional
    description?: string;

    @Column()
    cpf!: string;

    @Column()
    address!: string;

    @Column()
    fone!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export { Client };
