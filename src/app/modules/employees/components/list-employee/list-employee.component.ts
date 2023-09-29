import { Component } from '@angular/core';
import { EmployeeService } from '../../../../services/employee.services';
import { ToastrService } from 'ngx-toastr';
import { Modal, Ripple, initTE } from 'tw-elements';
import { faSortAlphaUp, faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
})
export class ListEmployeeComponent {
  data: any;
  dataFilter: any;
  id: string = '';
  employee: any;
  page: number = 1;
  tableSize: number = 10;
  tableSizes: any = [10, 25, 50, 100];
  search: string = '';
  sortDirectionFirstName: number = 1;
  sortDirectionLastName: number = 1;
  sortDirectionEmail: number = 1;
  sortDirectionSalary: number = 1;
  sortDirectionGroup: number = 1;
  sortUp = faSortAlphaUp;
  sortDown = faSortAlphaDown;
  queryParams: any = {};

  constructor(
    private _employeeService: EmployeeService,
    private _toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getData();
    this.historyStateCheck();
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParams = queryParams;
      this.search = queryParams['search'] || '';
      this.page = +queryParams['page'] || 1;
      this.tableSize = +queryParams['perPage'] || 10;

      localStorage.setItem('queryParams', JSON.stringify(this.queryParams));
    });
  }

  historyStateCheck() {
    const querySaved = localStorage.getItem('queryParams');
    if (querySaved) {
      this.queryParams = JSON.parse(querySaved);
      this.search = this.queryParams['search'] || '';
      this.page = this.queryParams['page'] || 1;
      this.tableSize = this.queryParams['perPage'] || 10;
      setTimeout(() => {
        this.updateListData();
      }, 50);
    }
  }

  getData() {
    this._employeeService.getData().subscribe((data) => {
      this.data = data;
      this.dataFilter = this.data;
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

  viewEdit(id: number) {
    this.router.navigate(['employee/edit', id]);
  }

  viewDetail(id: number) {
    this.router.navigate(['employee/detail', id]);
  }

  onSearch(event: any) {
    this.updateQueryParams(event.target.value);
    this.search = event.target.value;
    this.updateListData();
  }

  updateListData() {
    this.dataFilter = this.data?.filter((item: any) => {
      return item.firstName.toLowerCase().includes(this.search.toLocaleLowerCase()) || 
              item.lastName.toLowerCase().includes(this.search.toLocaleLowerCase()) ||
              item.email.toLowerCase().includes(this.search.toLocaleLowerCase()) ||
              item.basicSalary.toString().toLowerCase().includes(this.search.toLocaleLowerCase()) ||
              item.group.toLowerCase().includes(this.search.toLocaleLowerCase());
    });
  }

  updateQueryParams(value: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: value, page: 1},
      queryParamsHandling: 'merge'
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: event},
      queryParamsHandling: 'merge'
    });
    this.getData();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 1, perPage: event.target.value },
      queryParamsHandling: 'merge'
    });
    this.getData();
  }

  sortByFirstName() {
    this.dataFilter.sort((a: any, b: any) =>
      this.sortDirectionFirstName * a.firstName.localeCompare(b.firstName)
    );
    this.sortDirectionFirstName *= -1;
  }

  sortByLastName() {
    this.dataFilter.sort((a: any, b: any) =>
      this.sortDirectionLastName * a.lastName.localeCompare(b.lastName)
    );
    this.sortDirectionLastName *= -1;
  }

  sortByEmail() {
    this.dataFilter.sort((a: any, b: any) =>
      this.sortDirectionEmail * a.email.localeCompare(b.email)
    );
    this.sortDirectionEmail *= -1;
  }

  sortBySalary() {
    this.dataFilter.sort((a: any, b: any) => this.sortDirectionSalary * (a.basicSalary - b.basicSalary));
    this.sortDirectionSalary *= -1;
  }

  sortByGroup() {
    this.dataFilter.sort((a: any, b: any) =>
      this.sortDirectionGroup * a.group.localeCompare(b.group)
    );
    this.sortDirectionGroup *= -1;
  }
}
