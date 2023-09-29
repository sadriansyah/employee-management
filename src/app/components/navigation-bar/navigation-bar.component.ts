import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
    Collapse,
    Dropdown,
    initTE,
} from "tw-elements";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})
export class NavigationBarComponent {
    active = true;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        initTE({ Collapse, Dropdown});
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['']);
    }
}
