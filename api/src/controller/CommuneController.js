const Commune = require("../models/communeModel");
const { Request, Response } = require("express");
const fokotanyModel = require("../models/fokotanyModel");

class CommuneController {
  /**
   * @route POST /api/commune/create
   * @param {Request} req
   * @param {Response} res
   */

  create = async (req, res) => {
    const { nom, region } = req.body;

    const newCommune = new Commune({
      nom,
      region,
    });
    try {
      const commune = await newCommune.save();
      res.status(201).send(commune);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };

  /**
   * @route GET /api/commune/fetch
   *
   * @param {Response} res
   */

  fetch = async (_, res) => {
    try {
      const commune = await Commune.find().populate("region", "nom");
      res.status(200).send(commune);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
  /**
   *  @route PUT /api/commune/update/:id
   *  @param {Request} req
   *  @param {Response} res
   **/
  update = async (req, res) => {
    const { nom, region } = req.body;
    try {
      const commune = await Commune.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            nom: nom,
            region: region,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).send(commune);
    } catch (err) {
      res.status(404).send("Something went wrong");
    }
  };

  /**
   * @route DELETE /api/commune/delete/:id
   * @param {Request} req
   * @param {Response} res
   */
  delete = async (req, res) => {
    try {
      const fokotany = await fokotanyModel.find({ commune: req.params.id });
      if (fokotany) res.status(400).send(false);
      res.status(200).send(true);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
}

module.exports = CommuneController;
