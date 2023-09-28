import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Validation,
  Datetimepicker,
  Input,
  Select,
  initTE
} from "tw-elements";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
})
export class AddEmployeeComponent {
  constructor(private router: Router){}

  ngOnInit() {
    initTE({ Validation, Datetimepicker, Input, Select });
  }

  navigateBack() {
    this.router.navigate(['/employee'], { replaceUrl: true });
  }
}
