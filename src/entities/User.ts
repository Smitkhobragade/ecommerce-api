import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-generated primary key

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone?: string;

  constructor(name: string, email: string, phone?: string) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
