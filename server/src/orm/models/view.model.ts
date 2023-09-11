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
    tableName: "views",
    timestamps: true,
    paranoid: true,
  })
  export class View extends Model {
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
    view!: boolean;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    postId!: number;
    @BelongsTo(() => Post)
    post!: Post;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId!: number;
  
    @BelongsTo(() => User)
    user!: User;
  }
  