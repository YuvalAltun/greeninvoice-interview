import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Department from '../../models/Department';

/**
 * Builds a mongoose query object to search departments according to department name.
 * @param name String containing the department name or part of the department's name
 */
const buildDepartmentSeachQuery = (name?: string): { [key: string]: any } => {
  const query: any = {};
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i');
  }

  return query;
};

const search: RequestHandler = async (req, res) => {
  const { name, author } = req.query;

  const query = buildDepartmentSeachQuery((name as string));
  const departments = await Department.find(query);
  res.send({ departments });
};

export default requestMiddleware(search);
