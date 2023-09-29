import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { ListEmployeeComponent } from "./components/list-employee/list-employee.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DetailEmployeeComponent } from "./components/detail-employee/detail-employee.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";
import { EditEmployeeModule } from "./components/edit-employee/edit-employee.module";

@NgModule({
    declarations: [
        AddEmployeeComponent,
        ListEmployeeComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EditEmployeeModule,
        RouterModule.forChild([
            { path: '', component: ListEmployeeComponent },
            { path: 'create', component: AddEmployeeComponent },
            { path: 'detail/:id', component: DetailEmployeeComponent},
            { path: 'edit/:id', component: EditEmployeeComponent },
        ]),
        NgxPaginationModule,
        FontAwesomeModule
    ],
    exports: [RouterModule]
})

export class EmployeesModule {}