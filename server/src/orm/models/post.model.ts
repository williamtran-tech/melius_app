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
    BelongsToMany,
  } from "sequelize-typescript";
import { User } from "./user.model";
import { Topic } from "./topic.model";
import { TagPostRels } from "./tag.post.rel.model";
import { Tag } from "./tag.model";
import { PostImage } from "./post.images.model";
import { Comment } from "./comment.model";
import { React } from "./react.model";
import { View } from "./view.model";

  @Table({
    tableName: "posts",
    timestamps: true,
    paranoid: true,
  })
  export class Post extends Model {
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
    content!: string;
  
    @Column({
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    isAnonymous!: boolean;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      unique: false
    })
    userId!: number;
  
    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Topic) 
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: false
    })
    topicId!: number;

    @BelongsTo(() => Topic, {
        foreignKey: 'topicId',
    })
    topic!: Topic;

    @BelongsToMany(() => Tag, () => TagPostRels)
    tags!: Tag[];

    @HasMany(() => PostImage, {
      onDelete: "CASCADE",
    })
    images!: PostImage[];

    @HasMany(() => Comment, {
      foreignKey: 'postId',
      onDelete: "CASCADE",
    })
    comments!: Comment[];

    @HasMany(() => React, {
      onDelete: "CASCADE",
    })
    reacts!: React[];

    @HasMany(() => View, {
      onDelete: "CASCADE",
    })
    views!: View[];
  }
  