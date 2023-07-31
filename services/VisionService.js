'use strict'

const axios = require('axios');
const {flatMapDeep, uniq, isArray} = require('lodash');
const Rekognition = require('node-rekognition')

const awsConfig = require('../config/aws_config.json');


const OPENCV_API_URL = 'http://13.124.64.142:5000';
exports.callOpenCV = async (key) => {
  try {
    const rsp = await axios.get(`${OPENCV_API_URL}/search/${key}`);
    return rsp.data;
  } catch (e) {
    console.log('open cv call err', e)
    throw 400;
  }
};

exports.detect = async (imageMeta) => {
  if (!imageMeta) return null;

  if (!isArray(imageMeta)) {
    imageMeta = [imageMeta];
  }
  try {
    const awsLabels = await rekognition(imageMeta)
    const labels = uniq(awsLabels.map(label => label.Name));
    return labels;
  } catch (e) {
    throw e;
  }
}

const rekognition = async (meta) => {
  try {

    const rekognition = new Rekognition(awsConfig);

    const rekognitions = meta.map(item => {
      item.Key = item.key;
      return rekognition.detectLabels(item);
    })

    const results = flatMapDeep(await Promise.all(rekognitions)).map(result => result.Labels);
    return flatMapDeep(results);

  } catch (e) {
    console.log('err rekognition', e);
    throw e;
  }
}