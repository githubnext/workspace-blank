import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Storylet extends Model {
  public id!: number;
  public conditions!: string;
  public priority!: number;
  public content!: string;
  public outcomes!: string;
}

Storylet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conditions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    outcomes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Storylet',
  }
);

export default Storylet;
