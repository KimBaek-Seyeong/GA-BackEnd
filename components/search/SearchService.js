'use strict';

const Op = require('sequelize').Op;

const searchRepository = require('./SearchRepository');
const visionService = require('../../services/VisionService');


exports.imageSearch = async ({userId, meta, type}) => {
  try {

    const labels = await visionService.callOpenCV(meta[0].key);

    // const labels = await visionService.detect(meta);
    if (labels.length === 0) {
      throw 1404;
    }
    const search = await searchRepository.imageSearch({keyword: labels[0], type})

    return search;
  } catch (e) {
    console.log('err', e)
    throw e;
  }
};


exports.search = async (data) => {
  try {

    const date = data.date || new Date();
    const type = data.type || 'lost';
    const title = data.title ? {title: {[Op.like]: `%${data.title}%`}} : {title: {[Op.like]: ``}};

    delete data.date;
    delete data.type;
    delete data.title;

    const search = await searchRepository.search({data, title, date, type})

    return search;


  } catch (e) {
    throw e;
  }
}