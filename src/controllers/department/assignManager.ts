import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Employee from '../../models/Employee';
import Department from '../../models/Department';

export const assignManagerToDepartmentSchema = Joi.object().keys({
  departmentId: Joi.string().required(),
  managerId: Joi.string().required()
});

const assignManagerToDepartment: RequestHandler = async (req, res) => {
  const { departmentId, managerId } = req.body;
  const department = await Department.findById(departmentId);
  if (!department) {
    res.status(400);
    throw new Error('department not found');
  }
  const manager = await Employee.findById(managerId);
  if (!manager) {
    res.status(400);
    throw new Error('manager not found');
  }
  if (!department?.managers?.includes(manager._id)) {
    department?.managers.push(manager._id);
    await department?.save();
  }
  res.send({
    message: 'updated',
    department: department.toJSON()
  });
};

export default requestMiddleware(
  assignManagerToDepartment, { validation: { body: assignManagerToDepartmentSchema } }
);
