'use strict';

const imageUtil = require('../utils/ImageUtil');
const authMiddleware = require('../middlewares/AuthMiddleware')
const searchController = require('../components/search/SearchController');

module.exports = (router) => {

  router.route('/v1/search')
    .post(authMiddleware.auth, searchController.search)

  router.route('/v1/search/image/:type')
    .post(authMiddleware.auth, imageUtil.uploadSingle, searchController.imageSearch);

  router.route('/v1/image/search/:type')
    .post(authMiddleware.auth, imageUtil.uploadSingle, searchController.imageSearch);




  return router;
};