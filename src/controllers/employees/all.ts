import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Employee from '../../models/Employee';

const all: RequestHandler = async (req, res) => {
  const employees = await Employee.find({});
  res.send({ employees });
};

export default requestMiddleware(all);
