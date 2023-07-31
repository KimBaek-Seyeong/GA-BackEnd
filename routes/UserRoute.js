'use strict';

const userCtrl = require('../components/user/UserController');
const imageUtils = require('../utils/ImageUtil');
const authMdwr = require('../middlewares/AuthMiddleware');

module.exports = (router) => {

  router.route('/v1/users/register')
    .post(userCtrl.signUp);

  router.route('/v1/users/login')
    .post(userCtrl.signIn);

  router.route('/v1/users/losts')
    .get(authMdwr.auth, userCtrl.getUserLosts);

  router.route('/v1/users/founds')
    .get(authMdwr.auth, userCtrl.getUserFounds);

  router.route('/v1/users/:userId')
    .get(userCtrl.getUserProfile);


  router.route('/v1/users')
    .get(authMdwr.auth, userCtrl.getProfile)
    .put(authMdwr.auth, imageUtils.uploadSingle, userCtrl.editUserProfile)


  return router;
};