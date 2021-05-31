const Proprietaire = require("../models/proprietaire");
const { Request, Response } = require("express");

class ProprietaireController {
  /**
   * @route POST /api/proprietaire/create
   * @param {Request} req
   * @param {Response} res
   */

  create = async (req, res) => {
    const { logement, proprietaire, famille } = req.body;

    const newLogement = new Proprietaire({
      logement,
      proprietaire,
      famille,
    });
    try {
      const proprietaire = await newLogement.save();
      res.status(201).send(proprietaire);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };

  /**
   * @route GET /api/proprietaire/fetch
   *
   * @param {Response} res
   */

  fetch = async (_, res) => {
    try {
      const proprietaire = await Proprietaire.find()
        .populate("proprietaire", "nom prenom")
        .populate("logement", "LogementLocalisation LogementAdresse");
      res.status(200).send(proprietaire);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
  /**
   *  @route PUT /api/proprietaire/update/:id
   *  @param {Request} req
   *  @param {Response} res
   **/
  update = async (req, res) => {
    const { logement, proprietaire, famille } = req.body;
    try {
      const proprietaire = await Commune.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            logement: logement,
            proprietaire: proprietaire,
            famille: famille,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).send(proprietaire);
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };

  /**
   * @route DELETE /api/proprietaire/delete/:id
   * @param {Request} req
   * @param {Response} res
   */
  delete = async (req, res) => {
    try {
      Proprietaire.findByIdAndDelete(req.params.id);
      res.status(200).send(true);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
}

module.exports = ProprietaireController;
