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
  id!: string;

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
}
