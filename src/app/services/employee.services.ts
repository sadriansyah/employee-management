import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class EmployeeService {
    apiUrl = 'http://localhost:3000/employee';

    constructor(private _http: HttpClient) {}

    getData() {
        return this._http.get(this.apiUrl);
    }

    findById(id: string) {
        return this._http.get(`${this.apiUrl}/${id}`);
    }

    postData(employee: any) {
        return this._http.post(this.apiUrl, employee);
    }

    update(id: string, employee: any) {
        return this._http.put(`${this.apiUrl}/${id}`, employee);
    }

    delete(id: string, employee: any) {
        return this._http.delete(`${this.apiUrl}/${id}`, employee);
    }
}