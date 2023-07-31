'use strict';

const util = require('../../utils/Crypto');
const userRepository = require('./UserRepository');
const foundRepository = require('../found/FoundRepository');
const lostRepository = require('../lost/LostRepository');


exports.signUp = async (userData) => {
  try {
    await userRepository.signUp(userData);
  } catch (e) {
    console.log(e);
    throw e;
  }
};


exports.getSalt = async (email) => {
  try {

    const {salt} = await userRepository.getSalt(email);
    return salt;
  } catch (e) {
    console.log('err getSalt in svc', e);
    throw e;
  }
};



exports.signIn = async ({email, password}) => {
  try {

    const {salt} = await userRepository.getSalt(email);

    const data = {
      email,
      password: util.doCipher(password, salt).pw,
    }

    return await userRepository.signIn(data);
  } catch (e) {
    console.log('err signIn in svc', e);
    throw e;
  }
}


exports.getProfile = async (userId) => {
  try {

    const user = await userRepository.findUserById(userId)

    const foundCount = await foundRepository.countAllByUserId(userId);
    const lostCount = await lostRepository.countAllByUserId(userId);

    return {
      user,
      foundCount,
      lostCount
    }
  } catch (e) {
    throw e;
  }
}

exports.getUserFounds = async (userId) => {
  try {
    return await foundRepository.findByUserId(userId);
  } catch (e) {
    throw e;
  }
}

exports.getUserLosts = async (userId) => {
  try {
    return await lostRepository.findByUserId(userId);
  } catch (e) {
    throw e;
  }
}

exports.editUserProfile = async ({userId, avatar}) => {
  try {

    await userRepository.editAvatar({userId, avatar});

  } catch (e) {
    throw e;
  }
}

exports.getUserProfile = async(userId) => {
  try {

    return userRepository.findUserById(userId);
  } catch (e) {
    throw e;
  }
}