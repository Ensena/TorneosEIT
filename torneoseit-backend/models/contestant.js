'use strict';

module.exports = (sequelize, DataTypes) => {
  let contestant = sequelize.define('contestant', {
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  });

  return contestant;
};
