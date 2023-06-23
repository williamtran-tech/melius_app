import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Account } from "./account.model";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  img!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  googleRefreshToken!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId!: number;

  @HasOne(() => Account, {
    foreignKey: "userId",
  })
  account!: Account;

  @BelongsTo(() => User, {
    foreignKey: "parentId",
  })
  parent!: User[];
}
