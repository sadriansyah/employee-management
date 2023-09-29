import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _toast: ToastrService
  ) {}

  ngOnInit() {
    initTE({ Input, Ripple});

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get form() { return this.loginForm.controls };

  onLogin(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      if (this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)) {
        localStorage.setItem('isLogin', '1');
        this._toast.success('Login Success fully.');
        this.router.navigate(['employee']);
      } else {
        this._toast.error('Username or password incorrect.');
      } 
    }
  }
}
