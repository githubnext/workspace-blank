import { Sequelize } from 'sequelize';
import Storylet from './models/storylet';
import NPC from './models/npc';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Initialize Storylet and NPC tables
    await Storylet.sync();
    await NPC.sync();

    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initializeDatabase();

export default sequelize;
