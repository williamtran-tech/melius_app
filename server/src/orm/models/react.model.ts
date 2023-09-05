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
  import { Post } from "./post.model";
  
  @Table({
    tableName: "reacts",
    timestamps: true,
  })
  export class React extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    })
    id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
      })
    nLikes!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
      })
    nDislike!: number;

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
  