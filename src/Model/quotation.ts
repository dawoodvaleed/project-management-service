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
export class Quotation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ nullable: true, type: "numeric" })
  length?: number;

  @Column({ nullable: true, type: "numeric" })
  height?: number;

  @Column({ nullable: true, type: "numeric" })
  breadth?: number;

  @Column({ nullable: true, type: "numeric" })
  numberOfItems?: number;

  @Column({ type: "numeric" })
  rate: number;

  @Column({ default: 0, type: "numeric" })
  progressPercentage: number;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  bankComments?: string;

  @Column({ nullable: true })
  customerComments?: string;

  @ManyToOne(() => Project, (project) => project.quotations)
  project: Project;

  @ManyToOne(() => Item, (item) => item.quotations)
  item: Item;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
