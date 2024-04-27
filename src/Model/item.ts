import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Measurement } from "./measurement";

@Entity()
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  work: string;

  @Column({ name: "unit_of_measurement" })
  unitOfMeasurement: string;

  @Column({ name: "name", nullable: true })
  name: string;

  @Column({ name: "material_percentage", nullable: true })
  materialPercentage: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Measurement, (measurement) => measurement.item)
  measurements: Measurement[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
