import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeEnum } from 'src/app/enums/employee-enums';
import { IEmployeeData } from 'src/app/interfaces/i-employee-data';
import { ISelectedDataAndOperation } from 'src/app/interfaces/i-selected-data-and-operation';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
})
export class EmployeeDashboardComponent implements OnInit {
  employeeData: Array<IEmployeeData>;

  constructor(private router: Router) {}

  onClickOfRecord(receivedData: ISelectedDataAndOperation) {
    if (receivedData.operation === 'edit') {
      this.router.navigate(['edit', receivedData.selectedItem.id]);
    }

    if (receivedData.operation === 'delete') {
      this.router.navigate(['delete', receivedData.selectedItem.id]);
    }
  }

  addEmployee() {
    this.router.navigate(['add-employee']);
  }

  ngOnInit(): void {
    this.employeeData = JSON.parse(
      localStorage.getItem(EmployeeEnum.LocalStorageKey)!
    );
  }
}
