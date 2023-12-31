import { Component } from '@angular/core';
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'employee-management';
  ngOnInit() {
    initTE({ Input, Ripple});
  }
}
