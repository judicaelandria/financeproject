const Occupant = require("../models/occupantModel");
const { Request, Response } = require("express");

class OccupantController {
  /**
   *@route POST api/Occupant/create
   *@param {Request} req
   *@param {Response} res
   */

  create = async (req, res) => {
    const {
      decision,
      nom,
      prenom,
      sexe,
      dateDeNaissance,
      fonction,
      cin,
      anneeOccupation,
      occupantReel,
      acteDeMariage,
      nomConjoint,
      prenomConjoint,
      sexeConjoint,
      cinConjoint,
      dateDeNaissanceConjoint,
      isAdministrationEmploye,
    } = req.body;

    const newOccupant = new Occupant({
      decision,
      nom,
      prenom,
      sexe,
      dateDeNaissance,
      fonction,
      cin,
      anneeOccupation,
      occupantReel,
      acteDeMariage,
      nomConjoint,
      prenomConjoint,
      sexeConjoint,
      cinConjoint,
      dateDeNaissanceConjoint,
      isAdministrationEmploye,
    });
    try {
      const Occupant = await newOccupant.save();
      res.status(201).send(Occupant);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log({ err });
    }
  };

  /**
   * @route GET api/Occupant/fetch
   * @param {Response} res
   */

  fetch = async (_, res) => {
    try {
      const Occupant = await Occupant.find();
      res.status(200).send(Occupant);
    } catch (err) {
      res.status(200).send("something wrong");
      console.log({ err });
    }
  };
}

module.exports = OccupantController;
