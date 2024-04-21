import { IsDate, IsEmail, Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Project } from "./project";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(4, 6)
  code: string;

  @Column({ name: "company_name" })
  companyName: string;

  @Column({ name: "bacnk_account_title" })
  bankAccountTitle: string;

  @Column({ name: "back_account_number" })
  bankAccountNumber: string;

  @Column({ name: "contact_person" })
  contactPerson: string;

  @Column({ nullable: true })
  landline?: string;

  @Column()
  mobile: string;

  @Column()
  @Length(15)
  cnic: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  ntn?: string;

  @Column({ nullable: true })
  strn?: string;

  @Column()
  @IsEmail()
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

  @Column({ name: "short_bill_generation_limit" })
  shortBillGenerationLimit: number;

  @Column({ name: "is_active" })
  isActive: boolean;

  @OneToMany(() => Project, (project) => project.customer)
  projects: Project[];

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt: Date;
}
