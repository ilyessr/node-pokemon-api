import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from "sequelize-typescript";

@Table({
  timestamps: false,
})
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    unique: {
      name: "uniqueNameConstraint",
      msg: "Ce nom existe déjà.",
    },
  })
  username!: string;

  @Column(DataType.STRING)
  password!: string;
}

export default User;
