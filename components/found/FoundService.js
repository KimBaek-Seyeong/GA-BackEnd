'use strict';

const visionService = require('../../services/VisionService');
const foundRepository = require('./FoundRepository');
const foundImageRepository = require('./FoundImageRepository');

exports.write = async ({userId, title, contents, location, foundAt, images, imageMeta, category, reward}) => {
  try {

    const labels = await visionService.detect(imageMeta);

    const createdId = await foundRepository.create({
      userId, title, contents, location, image: images[0], foundAt, category, labels: labels.toString(), reward
    });
    const bulkData = images.map(image => {
      return {foundId: createdId, path: image}
    });

    await foundImageRepository.bulkCreate(bulkData);

  } catch (e) {
    throw e;
  }
};

exports.getList = async () => {
  try {

    const result = await foundRepository.selectFounds();
    return result;
  } catch (e) {
    throw e;
  }
}

exports.getDetail = async ({userId, foundId}) => {
  try {

    const result = await foundRepository.findById({foundId});
    const found = result.toJSON();
    found.isMine = found.userId === userId;
    return found;
  } catch (e) {
    throw e;
  }
}


exports.delete = async ({userId, foundId}) => {
  try {
    const found = await foundRepository.findById({foundId});

    if (userId !== found.userId) {
      throw 400;
    }

    await foundRepository.updateIsDeletedById({flag: true, foundId})

  } catch (e) {
    throw e;
  }
}

exports.done = async ({userId, foundId}) => {
  try {

    const found = await foundRepository.findById({foundId});

    if (userId !== found.userId) {
      throw 400;
    }

    await foundRepository.updateIsClosedById({flag:true, foundId});
  } catch (e) {
    throw e;
  }
};