import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../services/employee.services';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Datetimepicker, Input, Select } from 'tw-elements';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
})
export class EditEmployeeComponent {
  editForm!: FormGroup;
  submitted = false;
  employeeId!: string;
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private _toast: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.employeeId = params['id'];
      this.findById(this.employeeId);
    });

    this.editForm = this.formBuilder.group({
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

    new Input(document.getElementById('birth'));
    new Input(document.getElementById('firstName'));
    new Input(document.getElementById('lastName'));
    new Input(document.getElementById('username'));
    new Input(document.getElementById('email'));
    new Input(document.getElementById('salary'));
    new Input(document.getElementById('status'));
    new Input(document.getElementById('description'));
    new Select(document.getElementById('selectGroup'));

    const datePicker = new Datetimepicker(document.getElementById('birth'));

    document
      .getElementById('birth')
      ?.addEventListener('close.te.datetimepicker', () => {
        const date = `${datePicker._dateValue}, ${datePicker._timeValue}`;
        this.editForm.get('birthDate')?.setValue(date);
      });
  }

  findById(id: string) {
    this._employeeService.findById(id).subscribe((data) => {
      this.employee = data;
      this.editForm.get('firstName')?.setValue(this.employee?.firstName);
      this.editForm.get('lastName')?.setValue(this.employee?.lastName);
      this.editForm.get('username')?.setValue(this.employee?.username);
      this.editForm.get('email')?.setValue(this.employee?.email);
      this.editForm.get('birthDate')?.setValue(this.employee?.birthDate);
      this.editForm.get('basicSalary')?.setValue(this.employee?.basicSalary);
      this.editForm.get('status')?.setValue(this.employee?.status);
      this.editForm.get('group')?.setValue(this.employee?.group);
      this.editForm.get('description')?.setValue(this.employee?.description);
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

  get form() {
    return this.editForm.controls;
  }

  navigateBack() {
    const queryParamsString = localStorage.getItem('queryParams');
    const queryParams = queryParamsString ? JSON.parse(queryParamsString) : {};
    this.router.navigate(['employee'], {
      queryParams: queryParams,
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.editForm.valid) {
      this._employeeService.update(this.employeeId,this.editForm.value).subscribe((res) => {
          this._toast.success('Employee Successfully Updated');
          this.router.navigate(['/employee'])
      });
    }
  }
}
