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
        type: DataTypes.STRING,
        allowNull: true
    }
  });

  tournament.associate = (models) => {
    tournament.hasMany(models.team);
    tournament.hasMany(models.question);
  };

  return tournament;
};
