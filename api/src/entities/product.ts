import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";


@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;
    
    @Column()
    preco: number;
    
    @Column()
    cor: string;

    @Column()
    tamanho: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
}