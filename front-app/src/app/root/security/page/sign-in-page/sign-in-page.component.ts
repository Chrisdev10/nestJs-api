import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from 'src/app/root/shared';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignInForm } from '../../data/form';
import { LabelInputComponent } from 'src/app/root/shared/ui/form/component/label-input/label-input.component';
import { ApiService } from 'src/app/root/shared/api/services';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    LabelInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent {
  formGroup: FormGroup;
  userNameLabel: string = 'username';
  passwordLabel: string = 'mots de passe';
  private readonly api: ApiService = inject(ApiService);
  constructor() {
    this.formGroup = new FormGroup<SignInForm>(<SignInForm>{
      username: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }
  get(key: string): FormControl<any> {
    return this.formGroup.get(key)! as FormControl<any>;
  }
  onSubmit() {
    this.api
      .get(
        `account?login=${this.get('username').value}&pwd=${
          this.get('password').value
        }`
      )
      .subscribe(data => {
        console.log('my data', data);
      });
  }
}
