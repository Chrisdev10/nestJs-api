import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutes } from 'src/app/root/shared/routes/enum/approute.enum';
@Component({
  selector: 'app-dashboard-router',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard-router.component.html',
  styleUrls: ['./dashboard-router.component.scss'],
})
export class DashboardRouterComponent {
  routes = AppRoutes;
}
