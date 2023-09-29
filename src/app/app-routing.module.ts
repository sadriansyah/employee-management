import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { 
    path: 'employee',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/employees/employees.module').then(module => module.EmployeesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
