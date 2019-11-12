import * as Yup from 'yup';
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    // validando dados enviados pelo corpo json
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      data_nascimento: Yup.date().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        success: false,
        error: 'Validations Fails, please verify sending datas',
      });
    }
    // verificando se usuario já foi cadastrado com o e-mail enviado
    const emailExist = await Students.findOne({
      where: { email: req.body.email },
    });

    if (emailExist) {
      return res
        .status(400)
        .json({ success: false, error: 'Students already exists' });
    }

    const { name, email, data_nascimento, peso, altura } = Students.create(
      req.body
    );

    return res.status(200).json({
      success: true,
      data: {
        name,
        email,
        data_nascimento,
        peso,
        altura,
      },
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { email } = req.body;

    const studentsEmail = await Students.findOne({ where: { email } });

    const userId = studentsEmail.id;

    const students = await Students.findByPk(userId);

    if (email !== students.email) {
      const userExist = await Students.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    const { id, name, altura, data_nascimento, peso } = await students.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      altura,
      data_nascimento,
      peso,
    });
  }
}
export default new StudentsController();
