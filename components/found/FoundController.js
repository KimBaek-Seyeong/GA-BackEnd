'use strict';

const foundService = require('./FoundService');

exports.write = async (req, res, next) => {
  const userId = req.userId;
  const images = req.files ? req.files.map(file => file.location) : null;
  const imageMeta = req.files;
  const {title, contents, foundAt, location, category, reward} = req.body;

  const dto = {userId, title, contents, location, foundAt, images, imageMeta, category, reward};

  try {
    await foundService.write(dto);
  } catch (e) {
    return next(e);
  }
  return res.r();
};


exports.getList = async (req, res, next) => {
  try {

    const result = await foundService.getList();
    return res.r(result);
  } catch (e) {
    return next(e);
  }
}

exports.getDetail = async (req, res, next) => {
  try {

    const userId = req.userId;
    const foundId = req.params.foundId;

    const result = await foundService.getDetail({userId, foundId});
    return res.r(result);

  } catch (e) {
    return next(e)
  }
}


exports.delete = async (req, res, next) => {
  try {

    const userId = req.userId;
    const {foundId} = req.params;
    await foundService.delete({userId, foundId});

    return res.r()
  } catch (e) {
    return next(e)
  }
}


exports.done = async (req, res, next) => {
  try {

    console.log('done')
    const userId = req.userId;
    const {foundId} = req.params;
    await foundService.done({userId, foundId});

    return res.r()
  } catch (e) {
    return next(e)
  }
}