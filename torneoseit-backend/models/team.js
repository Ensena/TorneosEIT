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

  team.associate = (models) => {
    team.belongsToMany(models.contestant, {
      through: 'contestant_teams',
      as: 'members',
    });
  };

  return team;
};
