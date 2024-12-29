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

  @Column({ name: "nature_of_work" })
  natureOfWork: string;

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

  @Column({ name: "internal_area", nullable: true, type: "numeric" })
  internalArea: number;

  @Column({ name: "external_area", nullable: true, type: "numeric" })
  externalArea: number;

  @Column({ name: "future_area", nullable: true, type: "numeric" })
  futureArea: number;

  @Column({ name: "elevation_area", nullable: true, type: "numeric" })
  elevationArea: number;

  @Column({ name: "construction_area", nullable: true, type: "numeric" })
  constructionArea: number;

  @Column()
  status: string;

  @Column({ name: "block_reason", nullable: true })
  blockReaon: string;

  @Column({ name: "is_verified" })
  isVerified: boolean;

  @Column({ name: "order_date", nullable: true })
  orderDate: Date;

  @Column({ name: "completion_date", nullable: true })
  completionDate: Date;

  @OneToMany(() => Measurement, (measurement) => measurement.project)
  measurements: Measurement[];

  @OneToMany(() => Quotation, (quotation) => quotation.project)
  quotations: Quotation[];

  @OneToMany(() => Invoice, (invoice) => invoice.project)
  invoices: Invoice[];

  @ManyToOne(() => Customer, (customer) => customer.projects)
  customer: Customer;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
