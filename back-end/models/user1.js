const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    identity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [["user", "admin"]]
      }
    }
  }, {
    timestamps: true,
  });

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.associate = function(models) {
    User.hasMany(models.Challenge, {
      foreignKey: 'userId',
      as: 'challenges'
    });
    User.hasMany(models.Winner, {
      foreignKey: 'userId',
      as: 'winners'
    });
  };

  return User;
};