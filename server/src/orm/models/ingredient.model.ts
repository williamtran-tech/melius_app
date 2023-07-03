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
import { ingreCategory } from "./ingre.category.model";

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
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @ForeignKey(() => ingreCategory)
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
  unitName!: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  nutrients!: string;

  @BelongsTo(() => ingreCategory)
  category!: ingreCategory;
}
