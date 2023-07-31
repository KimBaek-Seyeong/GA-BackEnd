'use strict';

const {FoundImage} = require('../../models');

exports.bulkCreate = async (bulkData) => {
  try {

    await FoundImage.bulkCreate(bulkData);
  } catch (e) {
    console.log('err bulk create in found image repo', e);
    throw e;
  }
}