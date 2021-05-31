const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const { User } = require("../models/User");
const { Request, Response } = require("express");
const { config } = require("dotenv-safe");

class AuthController {
  /**
   * @route POST api/users/create
   * @param {Request} req
   * @param {Response} res
   */

  fetch = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  };

  login = async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid  password");
    // authorized user
    if (user.userStatus) {
      const token = user.generateAuthToken();
      res.cookie(token).send(token);
      // unauthorized user
    } else {
      res.status(400).send("Access denied");
    }
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
  };

  /**
   * @route GET api/auth/usersInvitation
   * @param {Response} res
   */

  UsersInvitation = async (_, res) => {
    try {
      const users = await User.find();
      if (users.userStatus == false) {
        res.status(200).send(users);
      }
    } catch (err) {
      res.status(404).send("something went wrong");
    }
  };
}
function validate(req) {
  const Schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, Schema);
}
module.exports = AuthController;
