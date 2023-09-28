import { Component } from '@angular/core';
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

    ngOnInit() {
        initTE({ Collapse, Dropdown});
    }
}
