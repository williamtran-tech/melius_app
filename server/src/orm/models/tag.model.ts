import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
    BelongsToMany,
  } from "sequelize-typescript";
import { TagPostRels } from "./tag.post.rel.model";
import { Post } from "./post.model";
  
  @Table({
    tableName: "tags",
    timestamps: true,
  })
  export class Tag extends Model {
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

    @BelongsToMany(() => Post, () => TagPostRels)
    posts!: Post[];
  }
  