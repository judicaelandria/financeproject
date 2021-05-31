const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    prenom: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    matricule: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 12,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    uniteAdmin: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    telMobile: {
      type: String,
      required: true,
      minlength: 9,
      maxLength: 9,
    },
    Login: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    userStatus: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

const User = mongoose.model("User", userSchema);

function ValidateUser(user) {
  const Schema = {
    nom: Joi.string().min(2).max(50).required(),
    prenom: Joi.string().min(2).max(50).required(),
    matricule: Joi.string().min(6).max(12).required(),
    email: Joi.string().min(5).max(255).required().email(),
    uniteAdmin: Joi.string().min(5).max(255).required(),
    telMobile: Joi.string().min(5).max(13).required(),
    Login: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, Schema);
}

exports.User = User;
exports.validate = ValidateUser;
