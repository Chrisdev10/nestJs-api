import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Member } from '@Dashboard';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '@Shared/api';

@Component({
  selector: 'app-member-detail-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss'],
})
export class MemberDetailPageComponent {
  memberInfo: Member | undefined;
  constructor(private readonly router: Router, private readonly apiService: ApiService) {
    // we extract id from url to make the http call for full info user
    const id: string = this.router.url.slice(this.router.url.lastIndexOf('/') + 1);
    this.apiService.get(`account/${id}`).subscribe({
      next: data => (this.memberInfo = data.data.person),
      error: err => console.log(err),
    });
  }
}
