const Fokontany = require("../models/fokotanyModel");
const { Request, Response } = require("express");
const logementModel = require("../models/logementModel");

class FokotanyController {
  /**
   * @route POST api/fokontany/create
   * @param {Request} req
   * @param {Response} res
   */

  create = async (req, res) => {
    const { nom, commune } = req.body;

    const newFokontany = new Fokontany({
      nom,
      commune,
    });

    try {
      const Fokontany = await newFokontany.save();
      res.status(201).send(Fokontany);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log({ err });
    }
  };

  /**
   * @route get api/Logement/fokontany
   * @param {Response} res
   */

  fetch = async (_, res) => {
    try {
      const fokontany = await Fokontany.find().populate(
        "commune",
        "nom region"
      );
      res.status(200).send(fokontany);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log({ err });
    }
  };

  /**
   *  @route PUT /api/fokotany/update/:id
   *  @param {Request} req
   *  @param {Response} res
   **/
  update = async (req, res) => {
    const { nom, commune } = req.body;
    try {
      const fokotany = await Fokontany.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            nom: nom,
            commune: commune,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).send(fokotany);
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };

  /**
   * @route DELETE /api/fokotany/delete/:id
   * @param {Request} req
   * @param {Response} res
   */
  delete = async (req, res) => {
    try {
      const fokotany = await logementModel.find({ fokotany: req.params.id });
      if (fokotany) res.status(400).send(false);
      res.status(200).send(true);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
}

module.exports = FokotanyController;
