import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Project } from "./project";

@Entity()
export class Customer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: "bank_account_title" })
  bankAccountTitle: string;

  @Column({ name: "bank_account_number" })
  bankAccountNumber: string;

  @Column({ name: "contact_person" })
  contactPerson: string;

  @Column({ nullable: true })
  landline?: string;

  @Column()
  mobile: string;

  @Column()
  cnic: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  ntn?: string;

  @Column({ nullable: true })
  strn?: string;

  @Column()
  email: string;

  @Column()
  province: string;

  @Column({ name: "ra_service_tax" })
  raServiceTax: number;

  @Column({ name: "bank_hold_tax" })
  bankHoldTax: number;

  @Column({ name: "income_tax" })
  incomeTax: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ name: "short_bill_generation_limit" })
  shortBillGenerationLimit: number;

  @Column({ name: "is_active" })
  isActive: boolean;

  @OneToMany(() => Project, (project) => project.customer)
  projects: Project[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
