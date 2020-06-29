'use strict';

module.exports = (sequelize, DataTypes) => {
  let team = sequelize.define('submission', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    status: { // 0: running, 1: Accepted, 2: WA, 3: TLE
        type: DataTypes.BIGINT,
        allowNull: false
    },
    languaje: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.TEXT 
    }
  });

  // team.associate = (models) => {
  //   team.belongsTo(models.question);
  // };

  return team;
};
