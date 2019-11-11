import Sequelize, { Model } from 'sequelize';

class Students extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        data_nascimento: Sequelize.DECIMAL,
        peso: Sequelize.DECIMAL,
        altura: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    // retornar o modulo que acabou de ser criado
    return this;
  }
}

export default Students;
