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
  
  @Table({
    tableName: "tag_post_rels",
    timestamps: true,
  })
  export class TagPostRels extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;
    
    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    postId!: number;
    
    @ForeignKey(() => Tag) 
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    tagId!: number;
  }
  