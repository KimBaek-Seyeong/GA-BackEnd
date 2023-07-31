const {User} = require('../../models');
const Op = require('sequelize').Op;


exports.getSalt = async (email) => {
  try {
    const result = await User.findOne({
      where: {email},
      attributes: ['salt']
    })

    if (!result) {
      throw 401;
    }

    return result;
  } catch (e) {
    console.log('err getSalt in Repo', e);
    throw e;
  }
};



exports.signUp = async (userData) => await User.create(userData);

exports.signIn = async (userData) => {
  try {
    const result = await User.findOne({
      where: {
        [Op.and]: [{email: userData.email}, {password: userData.password}]
      },
      attributes: ['id', 'email', 'name']
    })

    if (!result) {
      throw 401;
    }

    return result;
  } catch (e) {
    console.log('err signIn in repo', e);
    throw e;
  }
};


exports.findUserById = (id) => {
  return User.findOne({
    where: {
      id
    },
    attributes: ['id', 'name', 'email', 'classId', 'avatar']
  })
}

exports.editAvatar = async ({userId, avatar}) => {
  return User.update(
    {
      avatar
    },
    {
      where: {
        id: userId
      }
    }
  )
}