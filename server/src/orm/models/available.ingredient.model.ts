import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Ingredient } from "./ingredient.model";

@Table({
  tableName: "available_ingredients",
  timestamps: true,
})
export class AvailableIngredient extends Model {
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

  @ForeignKey(() => Ingredient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ingredientId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient;
}
