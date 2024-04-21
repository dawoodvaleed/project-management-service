import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { IsDate } from "class-validator";
import { Item } from "./item";
import { Project } from "./project";

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  length?: number;

  @Column({ nullable: true })
  height?: number;

  @Column({ nullable: true })
  breadth?: number;

  @Column({ name: "number_of_items", nullable: true })
  numberOfItems?: number;

  @Column()
  quantity: number;

  @Column()
  rate: number;

  @Column({ name: "total_amount" })
  totalAmount: number;

  @Column({ name: "progress_percentage", default: 0 })
  progressPercentage: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: "bank_comments", nullable: true })
  bankComments?: string;

  @Column({ name: "customer_comments", nullable: true })
  customerComments?: string;

  @ManyToOne(() => Project, (project) => project.measurements)
  project: Project;

  @ManyToOne(() => Item, (item) => item.measurements)
  item: Item;

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt: Date;
}
