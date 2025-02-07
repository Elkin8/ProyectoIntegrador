module.exports = (sequelize, DataTypes) => {
  const Challenge = sequelize.define('Challenge', {
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

  Challenge.associate = function(models) {
    Challenge.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Challenge.hasOne(models.Winner, {
      foreignKey: 'challengeId',
      as: 'winner'
    });
    Challenge.hasOne(models.Reward, {
      foreignKey: 'challengeId',
      as: 'reward'
    });
  };

  return Challenge;
};