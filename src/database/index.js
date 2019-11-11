import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

// importando os modelos
import User from '../app/models/User';
import Students from '../app/models/Students';

// carregando os modelos
const models = [User, Students];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
