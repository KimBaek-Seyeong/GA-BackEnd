'use strict';

const util = require('../../utils/Crypto');
const userService = require('./UserService');
const authService = require('../../services/AuthService');

exports.signUp = async (req, res, next) => {
  try {

    const {pw, salt} = util.doCipher(req.body.password);

    const userData = {
      email: req.body.email,
      name: req.body.name,
      password: pw,
      salt: salt,
      avatar: '',
      classId: req.body.classId
    };

    await userService.signUp(userData, next);

    return res.r();
  } catch (error) {
    return next(error);
  }

};


exports.signIn = async (req, res, next) => {
  try {

    const {email, password} = req.body;
    // phone, pw 조회해서 값이 있다면 로그인 성공 -> 토큰 발급
    const user = await userService.signIn({email, password});

    const token = authService.issue({id: user.id, email: user.email});

    return res.r({
      profile: {
        id: user.id,
        email: user.email,
        name: user.name
      }, token
    });

  } catch (error) {
    return next(error);
  }
};


exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const result = await userService.getProfile(userId);

    return res.r(result);
  } catch (e) {
    return next(e)
  }
};

exports.getUserFounds = async (req, res, next) => {
  try {
    const userId = req.userId;

    const result = await userService.getUserFounds(userId);

    return res.r(result);
  } catch (e) {
    return next(e);
  }
};

exports.getUserLosts = async (req, res, next) => {
  try {

    const userId = req.userId;

    const result = await userService.getUserLosts(userId);
    return res.r(result);
  } catch (e) {
    return next(e);
  }
};

exports.editUserProfile = async (req, res, next) => {
  if (!req.file) {
    throw 400;
  }
  try {

    const userId = req.userId;
    const avatar = req.file.location;

    await userService.editUserProfile({userId, avatar});

    return res.r()
  } catch (e) {
    return next(e);
  }
}

exports.getUserProfile = async (req, res, next) => {
  try {

    const userId = req.params.userId;
    const result = await userService.getProfile(userId);

    return res.r(result);
  } catch (e) {
    return next(e);
  }
}