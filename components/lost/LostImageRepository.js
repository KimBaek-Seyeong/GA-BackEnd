'use strict';

const {LostImage} = require('../../models');

exports.bulkCreate = async (bulkData) => {
  try {
    await LostImage.bulkCreate(bulkData);
  } catch (e) {
    console.log('err bulk create in lost image repo', e);
    throw e;
  }
}