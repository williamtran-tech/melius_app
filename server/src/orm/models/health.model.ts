import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "health",
  timestamps: true,
})
export class Health extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  weight!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  height!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  bmi!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  tdee!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  kidId!: number;

  @BelongsTo(() => User)
  user!: User;
}
