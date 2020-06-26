'use strict';

module.exports = (sequelize, DataTypes) => {
  let team = sequelize.define('submission', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    status: {
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

  team.associate = (models) => {
    team.belongsTo(models.question);
  };

  return team;
};
