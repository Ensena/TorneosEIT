'use strict';

module.exports = (sequelize, DataTypes) => {
  let tournament = sequelize.define('tournament', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    prices: {
        type: DataTypes.STRING,
        allowNull: true
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  });

  tournament.associate = (models) => {
    tournament.belongsToMany(models.team, {
      through: 'tournament_teams'
    });
    tournament.belongsToMany(models.question, {
      through: 'tournament_questions',
      as: 'questions'
    });
    tournament.belongsToMany(models.contestant, {
      through: 'tournament_contestants'
    });
  };

  return tournament;
};
