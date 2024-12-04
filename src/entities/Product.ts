import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-generated primary key

  @Column()
  name: string;

  @Column()
  category: string;

  @Column("decimal")
  price: number;

  @Column()
  stockQuantity: number;

  constructor(name: string, category: string, price: number, stockQuantity: number) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.stockQuantity = stockQuantity;
  }
}
