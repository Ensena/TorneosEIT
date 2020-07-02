'use strict';

module.exports = (sequelize, DataTypes) => {
  let submission = sequelize.define('submission', {
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

  submission.associate = (models) => {
    submission.belongsTo(models.question);
    submission.belongsTo(models.team);
    submission.belongsTo(models.contestant);
  };

  return submission;
};
