import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import { IngreCategory } from "./ingre.category.model";
import { Allergy } from "./allergy.model";
import { AvailableIngredient } from "./available.ingredient.model";
import { User } from "./user.model";
import { Role } from "./role.model";

@Table({
  tableName: "user_roles",
  timestamps: true,
})
export class UserRole extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Role)
  role!: Role;
}
