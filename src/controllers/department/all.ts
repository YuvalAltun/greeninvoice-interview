import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Department from '../../models/Department';

const all: RequestHandler = async (req, res) => {
  const departments = await Department.find();
  res.send({ departments });
};

export default requestMiddleware(all);
