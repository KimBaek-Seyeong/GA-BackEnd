'use strict';

const {Found, User, FoundImage, sequelize} = require('../../models');

exports.create = async ({userId, title, contents, image, location, foundAt, category, labels, reward}) => {
  try {
    const result = await Found.create({userId, title, contents, location, image, foundAt, category, labels, reward})
    return result.id;
  } catch (e) {
    console.log('err create in found repo', e);
    throw e;
  }
};

exports.selectFounds = async () => {
  return Found.findAll({
    where: {
      // isClosed: false,
      isDeleted: false,
    },
    include: [
      {
        model: User, as: 'user', attributes: ['id', 'email', 'name', 'avatar'],
      },
      {
        model: FoundImage, as: 'images', attributes: ['id', 'path']
      }
    ],
    order: [
      ['id', 'DESC']
    ]
  });
}

exports.countAllByUserId = (userId) => {
  return Found.count({
    where: {userId},
  })
}


exports.findByUserId = (userId) => {
  return Found.findAll({
    where: {
      userId
    },
    include: [
      {
        model: FoundImage, as: 'images', attributes: ['id', 'path']
      }
    ],
    order: [
      ['id', 'DESC']
    ]
  })
}


exports.findById = ({foundId}) => {
  return Found.findOne({
    where: {
      id: foundId
    },
    include: [
      {
        model: User, as: 'user', attributes: ['id', 'email', 'name', 'avatar']
      },
      {
        model: FoundImage, as: 'images', attributes: ['id', 'path']
      }
    ],
  })
}

exports.updateIsDeletedById = ({flag, foundId}) => {
  return Found.update(
    {
      isDeleted: flag
    },
    {
      where: {
        id: foundId
      }
    }
  )
}


exports.updateIsClosedById = ({flag, foundId}) => {
  return Found.update(
    {
      isClosed: flag
    },
    {
      where: {
        id: foundId
      }
    }
  );
}