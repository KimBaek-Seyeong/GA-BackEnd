'use strict';

const searchService = require('./SearchService');

exports.search = async (req, res, next) => {
  const {category, location, title, date, type} = req.body;
  try {

    // const keys = Object.keys(req.body);

    const data = Object.keys(req.body).filter(key => req.body[key]).map(key => ({[key]: req.body[key]}));

    const dto = Object.assign({}, ...data)

    const result = await searchService.search(dto);

    return res.r(result);
  } catch (e) {
    return next(e);
  }
}

exports.imageSearch = async (req, res, next) => {
  try {

    const meta = req.file;
    if (!meta) {
      throw 400;
    }

    const userId = req.userId;
    const type = req.params.type || 'lost';

    const result = await searchService.imageSearch({userId, meta: [meta], type});
    return res.r(result);


  } catch (e) {
    return next(e);
  }
};