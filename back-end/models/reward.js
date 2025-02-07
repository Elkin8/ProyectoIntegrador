module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
  });

  Reward.associate = function(models) {
    Reward.hasOne(models.Winner, {
      foreignKey: 'rewardId',
      as: 'winner'
    });
    Reward.belongsTo(models.Challenge, {
      foreignKey: 'challengeId',
      as: 'challenge'
    });
    Reward.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Reward;
};