import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "accounts",
  timestamps: true,
})
export class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId!: number;

  @BelongsTo(() => User, {
    foreignKey: "userId",
    as: "user_id",
  })
  user!: User;
}
