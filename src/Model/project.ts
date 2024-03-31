import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { IsDate } from "class-validator";
import { Measurement } from "./measurement";
import { Vendor } from "./vendor";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "project_number" })
  projectNumber: string;

  @Column()
  branch: string;

  @Column({ name: "nature_of_work" })
  natureOfWork: string;

  @Column()
  year: string;

  @Column({ nullable: true })
  floor: string;

  @Column({ nullable: true })
  description: string;

  @Column()
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

  @ManyToOne(() => Vendor, (vendor) => vendor.projects)
  vendor: Vendor;

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt: Date;
}
