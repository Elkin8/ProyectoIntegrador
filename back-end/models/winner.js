module.exports = (sequelize, DataTypes) => {
  const Winner = sequelize.define('Winner', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
  });

  Winner.associate = function(models) {
    Winner.belongsTo(models.Challenge, {
      foreignKey: 'challengeId',
      as: 'challenge'
    });
    Winner.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Winner.belongsTo(models.Reward, {
      foreignKey: 'rewardId',
      as: 'reward'
    });
  };

  return Winner;
};