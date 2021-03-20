import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Employee from '../../models/Employee';

export const assignManagerToEmployeeSchema = Joi.object().keys({
  employeeId: Joi.string().required(),
  managerId: Joi.string().required()
});

const assignManagerToEmployee: RequestHandler = async (req, res) => {
  const { employeeId, managerId } = req.body;
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    res.status(400);
    throw new Error('employee not found');
  }
  const manager = await Employee.findById(managerId);
  if (!manager) {
    res.status(400);
    throw new Error('manager not found');
  }
  if (!manager?.employees?.includes(employee._id)) {
    manager?.employees.push(employee._id);
    await manager?.save();
  }

  res.send({
    message: 'updated',
    employee: manager.toJSON()
  });
};

export default requestMiddleware(
  assignManagerToEmployee, { validation: { body: assignManagerToEmployeeSchema } }
);
