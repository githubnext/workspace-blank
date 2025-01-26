import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class NPC extends Model {
  public id!: string;
  public name!: string;
  public traits!: string;
  public memory!: string;
  public directives!: string;
  public location!: string;
}

NPC.init(
  {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    traits: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    memory: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    directives: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'NPC',
  }
);

export default NPC;
