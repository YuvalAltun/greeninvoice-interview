import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Department from '../../models/Department';

export const addDepartmentSchema = Joi.object().keys({
  name: Joi.string().required()
});

const add: RequestHandler = async (req, res) => {
  const { name } = req.body;

  const department = new Department({ name });
  await department.save();

  res.send({
    message: 'Saved',
    department: department.toJSON()
  });
};

export default requestMiddleware(add, { validation: { body: addDepartmentSchema } });
