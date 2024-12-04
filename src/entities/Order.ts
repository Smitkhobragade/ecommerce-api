import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-generated primary key

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;

  @Column("date")
  orderDate: Date;

  @Column()
  quantity: number;

  constructor(user: User, product: Product, orderDate: Date, quantity: number) {
    this.user = user;
    this.product = product;
    this.orderDate = orderDate;
    this.quantity = quantity;
  }
}