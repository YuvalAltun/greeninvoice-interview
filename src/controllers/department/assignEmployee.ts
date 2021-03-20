import { RequestHandler } from 'express';
import Joi from '@hapi/joi';
import requestMiddleware from '../../middleware/request-middleware';
import Employee from '../../models/Employee';
import Department from '../../models/Department';

export const assignEmployeeToDepartmentSchema = Joi.object().keys({
  departmentId: Joi.string().required(),
  employeeId: Joi.string().required()
});

const assignEmployeeToDepartment: RequestHandler = async (req, res) => {
  const { departmentId, employeeId } = req.body;
  const department = await Department.findById(departmentId);
  if (!department) {
    res.status(400);
    throw new Error('department not found');
  }
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    res.status(400);
    throw new Error('employee not found');
  }
  if (!department?.employees?.includes(employee._id)) {
    department?.employees.push(employee._id);
    await department?.save();
  }

  res.send({
    message: 'updated',
    department: department.toJSON()
  });
};

export default requestMiddleware(
  assignEmployeeToDepartment, { validation: { body: assignEmployeeToDepartmentSchema } }
);
