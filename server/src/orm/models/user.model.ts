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
import { Health } from "./health.model";

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
    type: DataType.ENUM("male", "female"),
    allowNull: false,
  })
  gender!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dob!: Date;

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

  @HasMany(() => Health)
  healthRecord!: Health[];

  @BelongsTo(() => User, {
    foreignKey: "parentId",
  })
  parent!: User[];
}
