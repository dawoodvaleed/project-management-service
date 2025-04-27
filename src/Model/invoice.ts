import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { IsDate } from "class-validator";
import { Project } from "./project";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.invoices)
  project: Project;

  @Column()
  paymentType: string;

  @Column({ type: "numeric", default: 0 })
  paidAmount: number;

  @Column({ type: "numeric", default: 0 })
  requestedAmount: number;

  @Column({ type: "numeric", default: 0 })
  balance: number;

  @Column({ default: false })
  paymentPost: boolean;

  @Column({ type: "numeric", default: 0 })
  percentage: number;

  @Column({ nullable: true })
  iom: string;

  @Column({ nullable: true })
  bankPaymentReference: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
