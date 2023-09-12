import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from "sequelize-typescript";
  import { Post } from "./post.model";
  
  @Table({
    tableName: "topics",
    timestamps: true,
    paranoid: true,
  })
  export class Topic extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id!: number;
  
    @Column({
      type: DataType.TEXT,
      allowNull: false,
    })
    name!: string;

    @HasMany(() => Post, {
      onDelete: "CASCADE",
    })
    posts!: Post[];
  }
  