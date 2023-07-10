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

@Table({
  tableName: "ingredients",
  timestamps: true,
})
export class Ingredient extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fdcId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @ForeignKey(() => IngreCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  portionValue!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  portionUnit!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  nutrients!: string;

  @BelongsTo(() => IngreCategory)
  category!: IngreCategory;

  @BelongsToMany(() => User, () => Allergy)
  kids!: User[];

  @BelongsToMany(() => User, () => AvailableIngredient)
  mothers!: User[];

  @HasMany(() => AvailableIngredient, {
    onDelete: "CASCADE",
  })
  availableIngredients!: AvailableIngredient[];
}
