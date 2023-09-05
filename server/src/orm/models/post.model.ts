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
  } from "sequelize-typescript";
import { User } from "./user.model";
import { Topic } from "./topic.model";

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
      type: DataType.STRING,
      allowNull: true,
    })
    filePath!: string;
  
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
  }
  