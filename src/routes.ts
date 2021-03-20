import { Router } from 'express';

import * as DepartmentController from './controllers/department';
import * as EmployeeController from './controllers/employees';


const router = Router();

// department routes
router.post('/department/add', DepartmentController.add);
router.post('/department/assignManager', DepartmentController.assignManager);
router.post('/department/assignEmployee', DepartmentController.assignEmployee);
router.get('/department/all', DepartmentController.all);
router.get('/department/search', DepartmentController.search);
router.get('/department/largest', DepartmentController.largest);

// employees routes
router.post('/employees/add', EmployeeController.add);
router.post('/employees/assignManager', EmployeeController.assignManager);
router.get('/employees/all', EmployeeController.all);
router.get('/employees/search', EmployeeController.search);

export default router;
