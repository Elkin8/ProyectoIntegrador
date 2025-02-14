module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define(
    "Audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      table_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      old_data: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      new_data: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      changed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Audits",
      timestamps: false,
      freezeTableName: true, 
    }
  );

  return Audit;
};