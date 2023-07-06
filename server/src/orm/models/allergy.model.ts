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
import { User } from "./user.model";
import { Ingredient } from "./ingredient.model";

@Table({
  tableName: "allergies",
  timestamps: true,
})
export class Allergy extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  kidId!: number;

  @ForeignKey(() => Ingredient)
  @Column({
    type: DataType.INTEGER,
  })
  ingredientId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient;
}