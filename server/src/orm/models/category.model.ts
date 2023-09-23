import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany,
  } from "sequelize-typescript";
import { Recipe } from "./recipe.model";
import { RecipeCategory } from "./recipe.category.model";
  
  @Table({
    tableName: "categories",
    timestamps: true,
  })
  export class Category extends Model {
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

    @BelongsToMany(() => Recipe, () => RecipeCategory)
    recipes!: Recipe[];
  }
  