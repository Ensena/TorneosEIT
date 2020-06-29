'use strict';

module.exports = (sequelize, DataTypes) => {
  let contestant = sequelize.define('contestant', {
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    power: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  contestant.associate = (models) => {
    contestant.hasMany(models.submission, {
      foreignKey: 'contestant_rut'
    });
  };
  return contestant;
};
