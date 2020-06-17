'use strict';

module.exports = (sequelize, DataTypes) => {
  let team = sequelize.define('team', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return team;
};
