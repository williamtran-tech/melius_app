import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
import { Post } from "./post.model";
import { Tag } from "./tag.model";
import { Recipe } from "./recipe.model";
import { Category } from "./category.model";
  
  @Table({
    tableName: "recipe_categories",
    timestamps: true,
    paranoid: true,
  })
  export class RecipeCategory extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;
    
    @ForeignKey(() => Recipe)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    recipeId!: number;
    
    @ForeignKey(() => Category) 
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    categoryId!: number;
  }
  