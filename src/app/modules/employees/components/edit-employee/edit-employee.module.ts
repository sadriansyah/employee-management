import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EditEmployeeComponent } from "./edit-employee.component";
@NgModule({
    declarations: [
        EditEmployeeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
})

export class EditEmployeeModule {}