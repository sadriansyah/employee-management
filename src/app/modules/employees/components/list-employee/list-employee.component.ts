import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.services';
import { ToastrService } from 'ngx-toastr';
import { Modal, Ripple, initTE } from 'tw-elements';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
})
export class ListEmployeeComponent {
  data: any;
  id: string;
  employee: any;

  constructor(
    private _employeeService: EmployeeService,
    private _toast: ToastrService,
  ) {
    this.id = '';
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._employeeService.getData().subscribe((data) => {
      this.data = data;
      this.loadInit()
    });
  }

  loadInit() {
    setTimeout(() => {
      initTE({ Modal, Ripple });
    }, 500);
  }

  setDeleteValue(id: string, employee: any) {
    this.id = id;
    this.employee = employee;
  }

  delete() {
    this._employeeService.delete(this.id, this.employee).subscribe((res) => {
      this.getData();
      this._toast.success('Employee has been deleted');
    })
  }
}
