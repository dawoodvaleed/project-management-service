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
  
    @Column({ name: "number_of_items", nullable: true, type: "numeric" })
    numberOfItems?: number;
  
    @Column({ type: "numeric" })
    rate: number;
  
    @Column({ name: "progress_percentage", default: 0, type: "numeric" })
    progressPercentage: number;
  
    @Column({ nullable: true })
    location?: string;
  
    @Column({ nullable: true })
    description?: string;
  
    @Column({ name: "bank_comments", nullable: true })
    bankComments?: string;
  
    @Column({ name: "customer_comments", nullable: true })
    customerComments?: string;
  
    @ManyToOne(() => Project, (project) => project.quotations)
    project: Project;
  
    @ManyToOne(() => Item, (item) => item.quotations)
    item: Item;
  
    @CreateDateColumn({ name: "created_at" })
    @IsDate()
    createdAt: Date;
  
    @UpdateDateColumn({ name: "updated_at" })
    @IsDate()
    updatedAt: Date;
  }
  