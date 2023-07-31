'use strict';

const imageUtils = require('../utils/ImageUtil');
const authMiddleware = require('../middlewares/AuthMiddleware');
const lostController = require('../components/lost/LostController');

module.exports = (router) => {

  router.route('/v1/lost')
    .get(lostController.getList)
    .post(authMiddleware.auth, imageUtils.uploadArray, lostController.write);

  router.route('/v1/lost/:lostId')
    .get(authMiddleware.auth, lostController.getDetail)
    .delete(authMiddleware.auth, lostController.delete)

  router.route('/v1/lost/:lostId/done')
    .post(authMiddleware.auth, lostController.done)

  return router;
};