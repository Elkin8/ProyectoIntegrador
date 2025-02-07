module.exports = (sequelize, DataTypes) => {
  const Challenge = sequelize.define('Challenge', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    reward: {
      type: DataTypes.STRING
    },
    rewardDescription: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
  });

  Challenge.associate = function(models) {
    Challenge.hasOne(models.Winner, {
      foreignKey: 'challengeId',
      as: 'winner'
    });
    Challenge.hasMany(models.Inscription, {
      foreignKey: 'challengeId',
      as: 'inscriptions'
    });
  };

  return Challenge;
};