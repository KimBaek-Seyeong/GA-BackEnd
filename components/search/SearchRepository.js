'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {Found, Lost, User, LostImage, FoundImage} = require('../../models');

exports.search = async ({data, title, date, type}) => {
  try {

    const options = {
      where: {

      },
      include: [
        {
          model: User, as: 'user', attributes: ['id', 'email', 'name', 'avatar']
        },
      ],
      order: [
        ['id', 'DESC']
      ],
      limit: 10
    };

    switch (type) {
      case 'lost':
        if (date) {
          options.where = {
            isDeleted: false,
            isClosed: false,
            [Op.or]: [
              data,
              title,
              {
                lostAt: {
                  [Op.eq]: date
                }
              }]
          }
        }
        options.include.push({
          model: LostImage, as: 'images', attributes: ['id', 'path']
        })
        return await Lost.findAll(options)
      case 'found':
        if (date) {
          options.where = {
            isDeleted: false,
            isClosed: false,
            [Op.or]: [
              data,
              title,
              {
                foundAt: {
                  [Op.eq]: date
                }
              }]
          }
        }
        options.include.push({
          model: FoundImage, as: 'images', attributes: ['id', 'path']
        })
        return await Found.findAll(options)
      default:
        return []
    }

  } catch (e) {
    console.log('err search in repo', e);
    throw e;
  }
}

exports.imageSearch = async ({keyword, type}) => {
  try {

    const options = {
      where : {
        isDeleted: false,
        labels: {
          [Op.like]: `%${keyword}%`
        }
      },
      include: [
        {
          model: User, as: 'user', attributes: ['id', 'email', 'name', 'avatar']
        },
      ],
      order: [
        ['id', 'DESC']
      ],
      limit: 10
    }

    switch (type) {
      case 'lost':
        options.include.push({
          model: LostImage, as: 'images', attributes: ['id', 'path']
        })
        return await Lost.findAll(options);
      case 'found':
        options.include.push({
          model: FoundImage, as: 'images', attributes: ['id', 'path']
        })
        return await Found.findAll(options);
      default:
        return []
    }



  } catch (e) {
    console.log('err', e);
    throw e;
  }
}