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
import { PlanDetail } from "./plan.detail.model";
import { Recipe } from "./recipe.model";

@Table({
  tableName: "meal_plans",
  timestamps: true,
  paranoid: true,
})
export class MealPlan extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  energyTarget!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  proteinTarget!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  fatTarget!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  carbTarget!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  kidId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => PlanDetail, {
    onDelete: "CASCADE",
  })
  planDetails!: PlanDetail[];

  @BelongsToMany(() => Recipe, () => PlanDetail)
  recipes!: Recipe[];
}
