'use strict';

const lostService = require('./LostService');

exports.write = async (req, res, next) => {
  const userId = req.userId;
  const {title, contents, lostAt, location, category, reward} = req.body;
  const images = req.files ? req.files.map(file => file.location) : null;
  const imageMeta = req.files;
  const dto = {userId, title, contents, location, lostAt, images, imageMeta, category, reward};
  try {
    await lostService.write(dto);
  } catch (e) {
    return next(e);
  }
  return res.r();
}


exports.getList = async (req, res, next) => {
  try {

    const result = await lostService.getList();
    return res.r(result);
  } catch (e) {
    return next(e);
  }
};

exports.getDetail = async (req, res, next) => {
  try {

    const userId = req.userId;
    const lostId = req.params.lostId;

    const result = await lostService.getDetail({userId, lostId});
    return res.r(result);

  } catch (e) {
    return next(e)
  }
}


exports.delete = async (req, res, next) => {
  try {

    const userId = req.userId;
    const {lostId} = req.params;
    await lostService.delete({userId, lostId});

    return res.r()
  } catch (e) {
    return next(e)
  }
}


exports.done = async (req, res, next) => {
  try {

    const userId = req.userId;
    const {lostId} = req.params;
    await lostService.done({userId, lostId});

    return res.r()
  } catch (e) {
    return next(e)
  }
}