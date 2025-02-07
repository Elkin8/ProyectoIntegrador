module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define('Audit', {
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
  });

  Audit.associate = function(models) {
    Audit.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Audit;
};