import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { IsDate } from "class-validator";
import { Role } from "./role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  contactNumber: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
