import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Measurement } from "./measurement";
import { Quotation } from "./quotation";

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  work: string;

  @Column()
  unitOfMeasurement: string;

  @Column({ nullable: true })
  name: string;

  @Column({ type: "numeric" })
  materialPercentage: number;

  @Column({ type: "numeric" })
  servicePercentage: number;

  @Column({ default: 0, type: "numeric" })
  price: number;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Measurement, (measurement) => measurement.item)
  measurements: Measurement[];

  @OneToMany(() => Quotation, (quotation) => quotation.item)
  quotations: Quotation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
