const informationConjoint = require("../models/informationtConjointModel");
const { Request, Response } = require("express");

class InformationConjointController {
  /**
   * @route POST api/Conjoint/create
   * @param {Request} req
   * @param {Response} res
   */

  create = async (req, res) => {
    const {
      informationConjointActeMariage,
      informationConjointNom,
      informationConjointPrenoms,
      informationConjointDateNaiss,
      informationConjointSexe,
      informationConjointCIN,
      informationConjointMinCode,
      informationConjointIM,
    } = req.body;
    const newinfoConjoint = new informationConjoint({
      informationConjointActeMariage,
      informationConjointNom,
      informationConjointPrenoms,
      informationConjointDateNaiss,
      informationConjointSexe,
      informationConjointCIN,
      informationConjointMinCode,
      informationConjointIM,
    });

    try {
      const Conjoint = await newinfoConjoint.save();
      res.status(201).send(Conjoint);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log({ err });
    }
  };

  /**
   * @route GET api/Conjoint/fetch
   *
   * @param {Response} res
   */

  fetch = async (_, res) => {
    try {
      const Conjoint = await informationConjoint.find();
      res.status(200).send(Conjoint);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
}

module.exports = InformationConjointController;
