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
import { User } from "./user.model";
import { MealPlan } from "./meal.plan.model";
import { Recipe } from "./recipe.model";

@Table({
  tableName: "plan_details",
  timestamps: true,
})
export class PlanDetail extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  mealTime!: Date;

  @Column({
    type: DataType.ENUM("Morning", "Noon", "Evening"),
    allowNull: false,
  })
  session!: string;

  @Column({
    type: DataType.ENUM("Main course", "Side dish", "Other"),
    allowNull: false,
  })
  type!: string;

  @ForeignKey(() => MealPlan)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  mealPlanId!: number;

  @ForeignKey(() => Recipe)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  recipeId!: number;

  @BelongsTo(() => MealPlan)
  mealPlans!: MealPlan[];

  @BelongsTo(() => Recipe)
  recipes!: Recipe[];
}
