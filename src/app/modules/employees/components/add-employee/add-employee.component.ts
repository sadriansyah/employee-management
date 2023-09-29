import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  Datetimepicker,
  Input,
  Select
} from "tw-elements";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private _toast: ToastrService
  ) {}

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      basicSalary: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      status: [null, Validators.required],
      group: [null, Validators.required],
      description: [null, Validators.required],
    });

    new Input(document.getElementById("birth"));
    new Input(document.getElementById("firstName"));
    new Input(document.getElementById("lastName"));
    new Input(document.getElementById("username"));
    new Input(document.getElementById("email"));
    new Input(document.getElementById("salary"));
    new Input(document.getElementById("status"));
    new Input(document.getElementById("description"));
    new Select(document.getElementById("selectGroup"));

    const datePicker = new Datetimepicker(document.getElementById("birth"));

    document.getElementById("birth")?.addEventListener('close.te.datetimepicker', () => {
      const date = `${datePicker._dateValue}, ${datePicker._timeValue}`;
      this.employeeForm.get('birthDate')?.setValue(date);
    });
  }

  dateOfBirthValidator(control: any) {
    const birthDate = new Date(control.value);
    const currentDate = new Date();
    if (birthDate > currentDate) {
      return { birthDateInvalid: true };
    }
    return null;
  }

  get form() { return this.employeeForm.controls };

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.valid) {
        this._employeeService.postData(this.employeeForm.value).subscribe((res) => {
          this._toast.success('New Employee Successfully added');
          this.router.navigate(['/employee'])
        });
    }
  }

  navigateBack() {
    const queryParamsString = localStorage.getItem('queryParams');
    const queryParams = queryParamsString ? JSON.parse(queryParamsString) : {};
    this.router.navigate(['employee'], {
      queryParams: queryParams,
    });
  }

}
