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

  @Column()
  bankAccountTitle: string;

  @Column()
  bankAccountNumber: string;

  @Column()
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

  @Column({ type: "numeric" })
  raServiceTax: number;

  @Column({ type: "numeric" })
  bankHoldTax: number;

  @Column({ type: "numeric" })
  incomeTax: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column({ type: "numeric" })
  shortBillGenerationLimit: number;

  @Column()
  isActive: boolean;

  @Column({ type: "numeric", default: 25 })
  advancePercentage: number;

  @Column({ type: "numeric", default: 25 })
  firstRunningPercentage: number;

  @Column({ type: "numeric", default: 25 })
  secondRunningPercentage: number;

  @OneToMany(() => Project, (project) => project.customer)
  projects: Project[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
