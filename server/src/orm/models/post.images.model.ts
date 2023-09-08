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
import { Post } from "./post.model";

  @Table({
    tableName: "post_images",
    timestamps: true,
    paranoid: true,
  })
  export class PostImage extends Model {
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
        allowNull: true,
    })
    caption!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    imagePath!: string;
    
    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    postId!: number;

    @BelongsTo(() => Post)
    post!: Post;
  }
  