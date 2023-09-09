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
  import { CommentReact } from "./comment.react.model";
  
  @Table({
    tableName: "comments",
    timestamps: true,
  })
  export class Comment extends Model {
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
        allowNull: true,
      })
    comment!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        })
    isAnonymous!: boolean;

    @ForeignKey(() => CommentReact)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    commentReactionId!: number;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    postId!: number;
    @BelongsTo(() => Post, {
      foreignKey: 'postId'
    })
    post!: Post;

    @ForeignKey(() => Comment)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    parentId!: number;
    
    @HasMany(() => Comment, {
      foreignKey: 'parentId',
      onDelete: "CASCADE",
      as: 'replies'
    })
    replies!: Comment[];
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId!: number;
  
    @BelongsTo(() => User)
    user!: User;
    
    @HasMany(() => CommentReact, {
      onDelete: "CASCADE",
    })
    commentReacts!: CommentReact[];
  }
  