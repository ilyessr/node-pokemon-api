"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const validTypes = [
    "Plante",
    "Poison",
    "Feu",
    "Eau",
    "Insecte",
    "Vol",
    "Normal",
    "Electrik",
    "Fée",
];
let Pokemon = class Pokemon extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Pokemon.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
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
    }),
    __metadata("design:type", String)
], Pokemon.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
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
    }),
    __metadata("design:type", Number)
], Pokemon.prototype, "hp", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
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
    }),
    __metadata("design:type", Number)
], Pokemon.prototype, "cp", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: "Utilisez uniquement une URL valide pour l'image." },
            notNull: { msg: "L'image est une propriété requise." },
        },
    }),
    __metadata("design:type", String)
], Pokemon.prototype, "picture", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        get() {
            return this.getDataValue("types").split(",");
        },
        set(value) {
            this.setDataValue("types", value.join(","));
        },
        validate: {
            isTypesValid(value) {
                if (!value) {
                    throw new Error("Un pokémon doit au moins avoir un type.");
                }
                if (value.split(",").length > 3) {
                    throw new Error("Un pokémon ne peux pas avoir plus de trois types.");
                }
                value.split(",").forEach((type) => {
                    if (!validTypes.includes(type)) {
                        throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`);
                    }
                });
            },
        },
    }),
    __metadata("design:type", String)
], Pokemon.prototype, "types", void 0);
Pokemon = __decorate([
    (0, sequelize_typescript_1.Table)({
        modelName: "Pokemon",
        timestamps: true,
        createdAt: "created",
        updatedAt: false,
    })
], Pokemon);
exports.default = Pokemon;
