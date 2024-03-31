import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { IsDate } from "class-validator";
import { Measurement } from "./measurement";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  work: string;

  @Column({ name: "unit_of_measurement" })
  unitOfMeasurement: string;

  @Column({ name: "item_name" })
  itemName: string;

  @Column({ name: "material_percentage" })
  materialPercentage: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Measurement, (measurement) => measurement.item)
  measurements: Measurement[];

  @CreateDateColumn({ name: "created_at" })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  @IsDate()
  updatedAt: Date;
}
