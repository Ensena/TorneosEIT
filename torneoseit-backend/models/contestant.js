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
    }
  });

  contestant.associate = (models) => {
    contestant.hasMany(models.submission);
  };
  return contestant;
};
