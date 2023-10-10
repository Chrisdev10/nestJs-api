import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  collapse = false;
  @HostListener('window:resize')
  navbarCollapse(e: Event): void {
    if (window.innerWidth <= 1000) {
      this.collapse = true;
    } else {
      this.collapse = false;
    }
  }
}
