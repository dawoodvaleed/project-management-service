import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Measurement } from "./measurement";
import { Customer } from "./customer";
import { Quotation } from "./quotation";
import { Invoice } from "./invoice";

@Entity()
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  branch: string;

  @Column()
  city: string;

  @Column()
  region: string;

  @Column()
  natureOfWork: string;

  @Column({ default: "NEW" })
  type: string;

  @Column({ nullable: true })
  bankRef: string;

  @Column()
  year: string;

  @Column({ nullable: true })
  floor: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: "numeric" })
  budget: number;

  @Column({ nullable: true })
  department: string;

  @Column({ nullable: true, type: "numeric" })
  internalArea: number;

  @Column({ nullable: true, type: "numeric" })
  externalArea: number;

  @Column({ nullable: true, type: "numeric" })
  futureArea: number;

  @Column({ nullable: true, type: "numeric" })
  elevationArea: number;

  @Column({ nullable: true, type: "numeric" })
  constructionArea: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  blockReason: string;

  @Column()
  isVerified: boolean;

  @Column({ nullable: true })
  orderDate: Date;

  @Column({ nullable: true })
  completionDate: Date;

  @OneToMany(() => Measurement, (measurement) => measurement.project)
  measurements: Measurement[];

  @OneToMany(() => Quotation, (quotation) => quotation.project)
  quotations: Quotation[];

  @OneToMany(() => Invoice, (invoice) => invoice.project)
  invoices: Invoice[];

  @ManyToOne(() => Customer, (customer) => customer.projects)
  customer: Customer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
