import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEmployeeData } from 'src/app/interfaces/i-employee-data';
import { ISelectedDataAndOperation } from 'src/app/interfaces/i-selected-data-and-operation';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
})
export class EmployeeTableComponent {
  @Input() employeeData: Array<IEmployeeData>;
  @Output() onClickOfRecord: EventEmitter<ISelectedDataAndOperation> =
    new EventEmitter();

  operationOnRecord(selectedItem: IEmployeeData, operation: 'edit' | 'delete') {
    this.onClickOfRecord.emit({ operation, selectedItem });
  }
}
