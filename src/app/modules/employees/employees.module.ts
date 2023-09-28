import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { ListEmployeeComponent } from "./components/list-employee/list-employee.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AddEmployeeComponent,
        ListEmployeeComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ListEmployeeComponent },
            { path: 'create', component: AddEmployeeComponent }
        ]),
        ReactiveFormsModule
    ],
    exports: [RouterModule]
})

export class EmployeesModule {}