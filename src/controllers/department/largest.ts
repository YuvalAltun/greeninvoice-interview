import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Department from '../../models/Department';

const search: RequestHandler = async (req, res) => {
  const { name, author } = req.query;

  const department = await Department.aggregate([
    { $unwind: '$employees' },
    { $group: { _id: '$_id', len: { $sum: 1 } } },
    { $sort: { len: -1 } },
    { $limit: 1 }
  ]);
  res.send({ department });
};

export default requestMiddleware(search);
