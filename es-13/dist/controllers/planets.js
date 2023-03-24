"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.updateById = exports.create = exports.getOneById = exports.getAll = void 0;
const joi = require("joi");
let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
const getAll = (req, res) => {
    res.status(200).json({ planets: planets });
};
exports.getAll = getAll;
const getOneById = (req, res) => {
    const { id } = req.params;
    const planet = planets.find(i => i.id === Number(id));
    res.status(200).json({ planet: planet });
};
exports.getOneById = getOneById;
const planetSchema = joi.object({
    id: joi.number().integer().required(),
    name: joi.string().required()
});
const create = (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        return res.status(400).json({ msg: validateNewPlanet.error });
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: "The planet was created." });
    }
};
exports.create = create;
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(p => p.id === Number(id) ? (Object.assign(Object.assign({}, p), { name })) : p);
    res.status(200).json({ msg: "The planet was updated" });
};
exports.updateById = updateById;
const deleteById = (req, res) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id));
    res.status(200).json({ msg: "The planet was deleted" });
};
exports.deleteById = deleteById;
