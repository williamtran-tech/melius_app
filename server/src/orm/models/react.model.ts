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
    paranoid: true,
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
        type: DataType.BOOLEAN,
        allowNull: true,
      })
    isLike!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
      })
    isDislike!: boolean;

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
  