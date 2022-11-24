import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeEnum } from 'src/app/enums/employee-enums';
import { IEmployeeData } from 'src/app/interfaces/i-employee-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
})
export class AddEditEmployeeComponent implements OnInit {
  employeeId: number;
  employeeForm: FormGroup;
  currentData: IEmployeeData;
  isDelete = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  setFormInitialValues() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      doj: ['', Validators.required],
    });
  }

  getDataToBeSave(storedEmployeeData: Array<IEmployeeData>) {
    const id = storedEmployeeData?.length
      ? +storedEmployeeData[storedEmployeeData.length - 1].id + 1
      : 1;
    return {
      ...this.employeeForm.value,
      id: id,
    };
  }

  saveEmployee() {
    if (this.employeeForm.invalid) {
      this.showError();
      return;
    }

    if (this.employeeForm.valid) {
      const storedEmployeeData: Array<IEmployeeData> = JSON.parse(
        localStorage.getItem(EmployeeEnum.LocalStorageKey)!
      );

      if (!this.employeeId) {
        const finalData = storedEmployeeData
          ? [...storedEmployeeData, this.getDataToBeSave(storedEmployeeData)]
          : [this.getDataToBeSave(storedEmployeeData)];

        localStorage.setItem(
          EmployeeEnum.LocalStorageKey,
          JSON.stringify(finalData)
        );
      }

      if (this.employeeId) {
        const dataOtherThanCurrent = storedEmployeeData.filter(
          (item) => item.id !== this.employeeId
        );

        localStorage.setItem(
          EmployeeEnum.LocalStorageKey,
          JSON.stringify([
            ...dataOtherThanCurrent,
            this.getDataToBeSave(dataOtherThanCurrent),
          ])
        );
      }

      this.router.navigate(['employee-dashboard']);
    }
  }

  patchValueIfEdit() {
    if (this.employeeId) {
      const employeeData = JSON.parse(
        localStorage.getItem(EmployeeEnum.LocalStorageKey)!
      );

      this.currentData = employeeData.find(
        (item: IEmployeeData) => item.id === this.employeeId
      );

      this.employeeForm.patchValue(this.currentData);
    }
  }

  onReset() {
    this.employeeForm.reset();
  }

  showError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-right',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'error',
      title: 'All fields are required',
    });
  }

  deleteEmployee() {
    Swal.fire({
      title: 'Are you sure want to Delete?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRecord(this.currentData);
      }
    });
  }

  deleteRecord(selectedRecord: IEmployeeData) {
    const storedEmployeeData: Array<IEmployeeData> = JSON.parse(
      localStorage.getItem(EmployeeEnum.LocalStorageKey)!
    );

    const dataOtherThanCurrent = storedEmployeeData.filter(
      (item) => item.id !== selectedRecord.id
    );

    localStorage.setItem(
      EmployeeEnum.LocalStorageKey,
      JSON.stringify([...dataOtherThanCurrent])
    );

    this.router.navigate(['employee-dashboard']);
  }

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.isDelete = this.router.url.includes('delete');

    this.setFormInitialValues();

    this.employeeId && this.patchValueIfEdit();
  }
}
