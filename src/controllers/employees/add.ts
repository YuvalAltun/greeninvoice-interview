import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Employee from '../../models/Employee';

export const addEmployeeSchema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().required()
});

const add: RequestHandler = async (req, res) => {
  const { name, age } = req.body;
  const employees: [] = [];
  const employee = new Employee({ name, age, employees });
  await employee.save();

  res.send({
    message: 'Saved',
    employee: employee.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addEmployeeSchema } });
