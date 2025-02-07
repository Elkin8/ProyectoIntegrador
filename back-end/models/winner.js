module.exports = (sequelize, DataTypes) => {
  const Winner = sequelize.define('Winner', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Challenges',
        key: 'id'
      }
    },
    proofLink: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamps: true,
  });

  Winner.associate = function(models) {
    Winner.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Winner.belongsTo(models.Challenge, {
      foreignKey: 'challengeId',
      as: 'challenge'
    });
  };

  return Winner;
};