'use strict';

const visionService = require('../../services/VisionService');
const lostRepository = require('./LostRepository');
const lostImageRepository = require('./LostImageRepository');

exports.write = async ({userId, title, contents, location, lostAt, images, imageMeta, category, reward}) => {
  try {

    const labels = await visionService.detect(imageMeta);

    const createdId = await lostRepository.create({
      userId, title, contents, location, image: images[0], lostAt, category, labels: labels.toString(), reward
    });
    const bulkData = images.map(image => {
      return {lostId: createdId, path: image}
    });

    await lostImageRepository.bulkCreate(bulkData);

  } catch (e) {
    throw e;
  }
};


exports.getList = async () => {
  try {

    const result = await lostRepository.findAll();

    return result;
  } catch (e) {
    throw e;
  }
}

exports.getDetail = async ({userId, lostId}) => {
  try {

    const result = await lostRepository.findById({lostId});
    const lost = result.toJSON();
    lost.isMine = lost.userId === userId;
    return lost;
  } catch (e) {
    throw e;
  }
}


exports.delete = async ({userId, lostId}) => {
  try {
    const lost = await lostRepository.findById({lostId});

    if (userId !== lost.userId) {
      throw 400;
    }

    await lostRepository.updateIsDeletedById({flag: true, lostId})

  } catch (e) {
    throw e;
  }
}

exports.done = async ({userId, lostId}) => {
  try {

    const lost = await lostRepository.findById({lostId});

    if (userId !== lost.userId) {
      throw 400;
    }

    await lostRepository.updateIsClosedById({flag: true, lostId})
  } catch (e) {
    throw e;
  }
};