import { 
    Entity, 
    PrimaryGeneratedColumn, // Use este decorador para gerar IDs automaticamente
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    ManyToOne, 
    JoinColumn,  
  } from "typeorm";
  import { Profile } from "./profile";
  
  /**
   * Entidade que representa um usuário no sistema.
   */
  @Entity("users")
  class User {
    @PrimaryGeneratedColumn("uuid") // Gera automaticamente um UUID
    id!: string;
  
    @Column()
    name!: string;
  
    @Column()
    email!: string;
  
    @Column()
    admin!: boolean;
  
    @Column()
    password!: string;
  
    @CreateDateColumn()
    created_at!: Date;
  
    @UpdateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => Profile)
    @JoinColumn()
    profile!: Profile;
  
    // O método setId não é mais necessário, pois o ID é gerado automaticamente
  }
  
  export { User };
  