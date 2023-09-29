import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../../../../services/employee.services";

@Component({
    selector: 'app-detail-employee',
    templateUrl: './detail-employee.component.html',
})

export class DetailEmployeeComponent {
    employeeId!: string;
    employee: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _employeeService: EmployeeService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.employeeId = params['id'];
            this.findById(this.employeeId);
        })
    }

    findById(id: string) {
        this._employeeService.findById(id).subscribe((data) => {
            this.employee = data;
        });
    }

    salaryFormat(number: number) {
        return number?.toLocaleString('de-DE');
    }
    
    formatDate(date: string) {
        const formatedDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }
        return formatedDate?.toLocaleDateString('en-US', options);
    }

    navigateBack() {
        const queryParamsString = localStorage.getItem('queryParams');
        const queryParams = queryParamsString ? JSON.parse(queryParamsString) : {};
        this.router.navigate(['employee'], {
            queryParams: queryParams,
        });
    }
}