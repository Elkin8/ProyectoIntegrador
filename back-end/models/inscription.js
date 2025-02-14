module.exports = (sequelize, DataTypes) => {
    const Inscription = sequelize.define('Inscription', {
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
  
    Inscription.associate = function(models) {
      Inscription.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Inscription.belongsTo(models.Challenge, {
        foreignKey: 'challengeId',
        as: 'challenge'
      });
    };
  
    return Inscription;
  };