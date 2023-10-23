import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/root/shared';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {}
