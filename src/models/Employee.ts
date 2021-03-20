import {
  Model, Schema, model, Types
} from 'mongoose';
import TimeStampPlugin, { ITimeStampedDocument } from './plugins/timestamp-plugin';

export interface IEmployee extends ITimeStampedDocument {
  name: string;
  age: number;
  employees: Object[]
}

interface IEmployeeModel extends Model<IEmployee> { }

const schema = new Schema<IEmployee>({
  name: { type: String, index: true, required: true },
  age: { type: Number, required: true },
  employees: [{ type: Types.ObjectId, ref: 'Employee', default: [] }]
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Employee: IEmployeeModel = model<IEmployee, IEmployeeModel>('Employee', schema);

export default Employee;
