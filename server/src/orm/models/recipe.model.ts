import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { MealPlan } from "./meal.plan.model";
import { PlanDetail } from "./plan.detail.model";
import { Category } from "./category.model";
import { RecipeCategory } from "./recipe.category.model";

@Table({
  tableName: "recipes",
  timestamps: true,
})
export class Recipe extends Model {
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cookTime!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nSteps!: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  steps!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  nIngredients!: number;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  ingredients!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  nutrition!: number[];

  @BelongsToMany(() => MealPlan, () => PlanDetail)
  plans!: MealPlan[];

  @BelongsToMany(() => Category, () => RecipeCategory)
  categories!: Category[];
}
