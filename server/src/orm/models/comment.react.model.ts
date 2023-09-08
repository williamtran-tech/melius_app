import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    Unique,
    HasMany,
  } from "sequelize-typescript";
  import { User } from "./user.model";
  import { Post } from "./post.model";
  import { Comment } from "./comment.model";
  
  @Table({
    tableName: "comment_reacts",
    timestamps: true,
  })
  export class CommentReact extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id!: number;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
      })
    isLike!: boolean;

    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    commentId!: number;
    @BelongsTo(() => Comment)
    comment!: Comment;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;
    @BelongsTo(() => User)
    user!: User;
  }
  