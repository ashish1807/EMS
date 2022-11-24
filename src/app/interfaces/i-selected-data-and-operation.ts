import { IEmployeeData } from './i-employee-data';

export interface ISelectedDataAndOperation {
  operation: 'edit' | 'delete';
  selectedItem: IEmployeeData;
}
