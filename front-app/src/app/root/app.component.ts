import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './shared/api/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.api.get('account?login=angular&pwd=angular').subscribe(data => {
      console.log('my data', data);
    });
  }
  title = 'front-app';
  private readonly api: ApiService = inject(ApiService);
}
