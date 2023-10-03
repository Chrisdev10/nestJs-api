import { Component } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-projet';
  constructor(private readonly test: TestService) {}
  testCall() {
    this.test.firstTest('admin', 'admin');
  }
}
