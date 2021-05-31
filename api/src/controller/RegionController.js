const Region = require("../models/regionModel");
const { Request, Response } = require("express");
const communeModel = require("../models/communeModel");

class RegionController {
  /**
   *  @route POST /api/region/create
   *  @param {Request} req
   *  @param {Response} res
   **/
  create = async (req, res) => {
    const { nom } = req.body;
    const newRegion = new Region({
      nom,
    });
    try {
      const region = await newRegion.save();
      res.status(201).send(region);
    } catch (err) {
      res.status(404).send("Something went wrong");
      console.log({ err });
    }
  };
  /**
   *  @route PUT /api/region/update/:id
   *  @param {Request} req
   *  @param {Response} res
   **/
  update = async (req, res) => {
	  const { id} = req.params
    const { nom } = req.body;
    try {
      const region = await Region.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            nom: nom,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).send(region);
    } catch (err) {
	    console.log(err)
      res.status(404).send("Something went wrong");
    }
  };

  /**
   * @route GET /api/regions/fetch
   * @param {Request} req
   * @param {Response} res
   */
  fetch = async (_, res) => {
    try {
      const regions = await Region.find();
      res.status(200).send(regions);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };

  /**
   * @route DELETE /api/region/delete/:id
   * @param {Request} req
   * @param {Response} res
   */
  delete = async (req, res) => {
    try {
      const commune = await communeModel.find({ region: req.params.id });
      if (commune) res.status(400).send(false);
      res.status(200).send(true);
    } catch (err) {
      res.status(404).send("something went wrong");
      console.log({ err });
    }
  };
}

module.exports = RegionController;
