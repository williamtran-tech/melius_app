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
  BelongsToMany,
} from "sequelize-typescript";
import { Account } from "./account.model";
import { Health } from "./health.model";
import { Allergy } from "./allergy.model";
import { Ingredient } from "./ingredient.model";
import { AvailableIngredient } from "./available.ingredient.model";
import { Role } from "./role.model";
import { UserRole } from "./user.role.model";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

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
    onDelete: "CASCADE",
  })
  account!: Account;

  @HasMany(() => Health, {
    onDelete: "CASCADE",
  })
  healthRecord!: Health[];

  @BelongsToMany(() => Ingredient, () => Allergy)
  ingredients!: Ingredient[];

  @BelongsToMany(() => Ingredient, () => AvailableIngredient)
  availableIngredients!: Ingredient[];

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];

  @BelongsTo(() => User, {
    foreignKey: "parentId",
  })
  parent!: User[];
}
