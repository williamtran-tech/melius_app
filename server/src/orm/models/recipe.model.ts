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
  ingredients!: object;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  nutrition!: number[];

  @BelongsToMany(() => MealPlan, () => PlanDetail)
  plans!: MealPlan[];
}
