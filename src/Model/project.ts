import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";
import { IsDate } from "class-validator";
import { Measurement } from "./measurement";
import { Customer } from "./customer";

@Entity()
export class Project {
  @PrimaryColumn()
  id: number;

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

  @Column({ name: "internal_area", nullable: true })
  internalArea: number;

  @Column({ name: "external_area", nullable: true })
  externalArea: number;

  @Column({ name: "future_area", nullable: true })
  futureArea: number;

  @Column({ name: "elevation_area", nullable: true })
  elevationArea: number;

  @Column({ name: "construction_area", nullable: true })
  constructionArea: number;

  @Column()
  status: string;

  @Column({ name: "block_reason", nullable: true })
  blockReaon: string;

  @Column({ name: "is_verified" })
  isVerified: boolean;

  @Column({ name: "order_date", nullable: true })
  @IsDate()
  orderDate: Date;

  @Column({ name: "completion_date", nullable: true })
  @IsDate()
  completionDate: Date;

  @OneToMany(() => Measurement, (measurement) => measurement.project)
  measurements: Measurement[];

  @ManyToOne(() => Customer, (customer) => customer.projects)
  customer: Customer;

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt: Date;
}
