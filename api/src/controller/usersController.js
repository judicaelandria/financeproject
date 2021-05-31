const { User, validate } = require("../models/User");
const { Request, Response } = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UsersController {
  /**
   * @route POST api/users/create
   * @param {Request} req
   * @param {Response} res
   */

  create = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) return res.status(400).send("User already registered");

    user = new User(
      _.pick(req.body, [
        "nom",
        "prenom",
        "matricule",
        "email",
        "uniteAdmin",
        "telMobile",
        "Login",
        "password",
        "userStatus",
      ])
    );
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      console.log(process.env.JWT_SECRET);
      const token = user.generateAuthToken();
      if (!token) return res.status(400).send("No token found");
      else
        return (
          res
            // .header("x-auth-token", token)
            .status(201)
            .send(
              _.pick(user, [
                "_id",
                "nom",
                "prenom",
                "matricule",
                "email",
                "uniteAdmin",
                "telMobile",
                "Login",
                "userStatus",
              ])
            )
        );
    } catch (error) {
      console.log({ error });
      res.status(500).send("Something went wrong");
    }
  };

  /**
   * @route PUT /users/:id/authorize
   * @param {Request} req
   * @param {Response} res
   */
  authorize = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            userStatus: req.body.userStatus,
            isAdmin: req.body.isAdmin,
          },
        },
        { new: true }
      );
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  };

  /**
   * @route GET /users
   * @param {Request} req
   * @param {Response} res
   */
  inactiveusers = async (_, res) => {
    try {
      const user = await User.find({ userStatus: false, isAdmin: false });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  };

  /**
   * @route GET /users
   * @param {Request} req
   * @param {Response} res
   */
  activeusers = async (_, res) => {
    try {
      const user = await User.find({ userStatus: true });
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  };

  /**
   * @route GET /users/:id
   * @param {Request} req
   * @param {Response} res
   */
  user = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({ _id: id });
      if (!user) res.status(404).send("the user doesn't exist");
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  };
}

module.exports = UsersController;
