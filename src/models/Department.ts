import {
  Model, Schema, model, Types
} from 'mongoose';
import TimeStampPlugin, {
  ITimeStampedDocument
} from './plugins/timestamp-plugin';

export interface IDepartment extends ITimeStampedDocument {
  name: string;
  managers: object[];
  employees: object[];
}

interface IDepartmentModel extends Model<IDepartment> { }

const schema = new Schema<IDepartment>({
  name: { type: String, index: true, required: true },
  employees: [{ type: Types.ObjectId, ref: 'Employee', default: [] }],
  managers: [{ type: Types.ObjectId, ref: 'Employee', default: [] }]
});

// Add timestamp plugin for createdAt and updatedAt in miliseconds from epoch
schema.plugin(TimeStampPlugin);

const Department: IDepartmentModel = model<IDepartment, IDepartmentModel>('Department', schema);

export default Department;
