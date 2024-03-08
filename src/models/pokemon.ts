import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from "sequelize-typescript";

const validTypes = [
  "Plante",
  "Eau",
  "Normal",
  "Poison",
  "Vol",
  "Psy",
  "Feu",
  "Insecte",
  "Electrik",
  "Fée",
  "Combat",
  "Acier",
  "Spectre",
  "Ténèbre",
  "Dragon",
  "Sol",
  "Roche",
  "Glace"
];

@Table({
  modelName: "Pokemon",
  timestamps: true,
  createdAt: "created",
  updatedAt: false,
})
class Pokemon extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: {
      name: "uniqueNameConstraint",
      msg: "Le nom est déjà pris.",
    },
    validate: {
      len: {
        args: [1, 25],
        msg: "Le nom doit contenir entre 1 et 25 caractères.",
      },
      notEmpty: { msg: "Le nom ne peut pas être vide." },
      notNull: { msg: "Le nom est une propriété requise." },
    },
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
      },
      min: {
        args: [0],
        msg: "Les points de vie doivent être supérieurs ou égales à 0.",
      },
      max: {
        args: [999],
        msg: "Les points de vie doivent être inférieures ou égales à 999.",
      },
      notNull: { msg: "Les points de vie sont une propriété requise." },
    },
  })
  hp!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: "Utilisez uniquement des nombres entiers pour les points de dégâts.",
      },
      min: {
        args: [0],
        msg: "Les points de dégâts doivent être supérieurs ou égales à 0.",
      },
      max: {
        args: [99],
        msg: "Les points de dégâts doivent être inférieures ou égales à 99.",
      },
      notNull: { msg: "Les points de dégâts sont une propriété requise." },
    },
  })
  cp!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isUrl: { msg: "Utilisez uniquement une URL valide pour l'image." },
      notNull: { msg: "L'image est une propriété requise." },
    },
  })
  picture!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    get() {
      return this.getDataValue("types").split(",");
    },
    set(value: string[]) {
      this.setDataValue("types", value.join(","));
    },
    validate: {
      isTypesValid(value: string) {
        if (!value) {
          throw new Error("Un pokémon doit au moins avoir un type.");
        }
        if (value.split(",").length > 3) {
          throw new Error("Un pokémon ne peux pas avoir plus de trois types.");
        }
        value.split(",").forEach((type) => {
          if (!validTypes.includes(type)) {
            throw new Error(
              `Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`
            );
          }
        });
      },
    },
  })
  types!: string;
}

export default Pokemon;
