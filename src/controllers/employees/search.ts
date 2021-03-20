import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Employee from '../../models/Employee';

/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param name String containing the employee name or part of the employee name
 * @param age Number containing the age of the employee
 */
const buildUserSearchQuery = (name?: string, age?: number): { [key: string]: any } => {
  const query: any = {};
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i');
  }
  if (age) {
    query.role = age;
  }

  return query;
};

const search: RequestHandler = async (req, res) => {
  const { name, age } = req.query;


  const query = buildUserSearchQuery((name as string), Number(age));
  const employees = await Employee.find(query);
  res.send({ employees });
};

export default requestMiddleware(search);
