'use strict';

const imageUtils = require('../utils/ImageUtil');
const authMiddleware = require('../middlewares/AuthMiddleware');
const foundController = require('../components/found/FoundController');

module.exports = (router) => {

  router.route('/v1/found')
    .get(foundController.getList)
    .post(authMiddleware.auth, imageUtils.uploadArray, foundController.write);

  router.route('/v1/found/:foundId')
    .get(authMiddleware.auth, foundController.getDetail)
    .delete(authMiddleware.auth, foundController.delete)

  router.route('/v1/found/:foundId/done')
    .post(authMiddleware.auth, foundController.done)


  return router;
};