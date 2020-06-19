'use strict';

module.exports = (sequelize, DataTypes) => {
  let question = sequelize.define('question', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    judge: {
        type: DataTypes.STRING,
        isUrl: true,
        allowNull: false
    },
    judgeid: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false
    }
   
  });

  question.associate = (models) => {
    question.belongsToMany(models.tournament, {
      through: 'tournament_questions',
      as: 'tournaments'
    });
  };

  return question;
};
