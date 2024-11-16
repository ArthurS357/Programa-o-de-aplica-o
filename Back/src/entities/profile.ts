import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        this.id = uuid(); // O ID é gerado automaticamente pelo TypeORM
    }
}
