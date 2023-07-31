'use strict';

const {Lost, User, LostImage} = require('../../models');

exports.create = async ({userId, title, contents, location, image, lostAt, category, labels, reward}) => {
  try {
    const result = await Lost.create({userId, title, contents, location, image, lostAt, category, labels, reward});
    return result.id;
  } catch (e) {
    console.log('err create in lost repo', e);
    throw e;
  }
}


exports.findAll = async () => {
  return Lost.findAll({
    where: {
      isDeleted: false,
      // isClosed: false
    },
    include: [
      {
        model: User, as: 'user', attributes: ['id', 'email', 'name', 'avatar']
      },
      {
        model: LostImage, as: 'images', attributes: ['id', 'path']
      }
    ],
    order: [
      ['id', 'DESC']
    ]
  });
}

exports.countAllByUserId = (userId) => {
  return Lost.count({
    where: {userId},
  })
}

exports.findByUserId = (userId) => {
  return Lost.findAll({
    where: {
      userId
    },
    include: [
      {
        model: LostImage, as: 'images', attributes: ['id', 'path']
      }
    ],
    order: [
      ['id', 'DESC']
    ]
  })
}

exports.findById = ({lostId}) => {
  return Lost.findOne({
    where: {
      id: lostId
    },
    include: [
      {
        model: User, as: 'user', attributes: ['id', 'email', 'name', 'avatar']
      },
      {
        model: LostImage, as: 'images', attributes: ['id', 'path']
      }
    ],
  })
};


exports.updateIsDeletedById = ({flag, lostId}) => {
  return Lost.update(
    {
      isDeleted: flag
    },
    {
      where: {
        id: lostId
      }
    }
  )
}


exports.updateIsClosedById = ({flag, lostId}) => {
  return Lost.update(
    {
      isClosed: flag
    },
    {
      where: {
        id: lostId
      }
    }
  );
}