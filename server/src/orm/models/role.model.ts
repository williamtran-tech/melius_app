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
import { UserRole } from "./user.role.model";

@Table({
  tableName: "roles",
  timestamps: true,
})
export class Role extends Model {
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
  name!: string;

  @BelongsToMany(() => User, () => UserRole)
  users!: User[];

  @HasMany(() => UserRole, {
    onDelete: "CASCADE",
  })
  userRoles!: UserRole[];
}
